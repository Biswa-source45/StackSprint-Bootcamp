import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { sendDoubtEmail } from '../lib/notify';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../components/ui/dialog';
import {
  BookOpen,
  CreditCard,
  LogOut,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  TrendingUp,
  LayoutDashboard,
  FileText,
  Home,
  Milestone,
  ArrowUpRight,
  IndianRupee,
  MessageCircleQuestion,
  Bell,
  Clock,
  Phone,
  Trash2,
  RotateCcw,
  Loader2,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

const emptyDoubtForm = { topic: '', description: '', preferredTime: '', contactNumber: '' };

function DoubtStatusBadge({ status, studentConfirmed }) {
  if (status === 'resolved') {
    return studentConfirmed ? (
      <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px] px-2 py-0.5">Resolved</Badge>
    ) : (
      <Badge className="bg-blue-100 text-blue-700 border-none text-[10px] px-2 py-0.5">Awaiting your confirmation</Badge>
    );
  }
  if (status === 'in_progress')
    return <Badge className="bg-amber-100 text-amber-700 border-none text-[10px] px-2 py-0.5">In Progress</Badge>;
  return <Badge className="bg-zinc-100 text-zinc-600 border-none text-[10px] px-2 py-0.5">Pending</Badge>;
}

export default function StudentDashboard() {
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();

  const [doubts, setDoubts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [doubtDialogOpen, setDoubtDialogOpen] = useState(false);
  const [doubtForm, setDoubtForm] = useState(emptyDoubtForm);
  const [submittingDoubt, setSubmittingDoubt] = useState(false);
  const [doubtActionId, setDoubtActionId] = useState(null);

  // Pre-fill contact number from profile once available
  useEffect(() => {
    if (userData?.mobile) {
      setDoubtForm((prev) => (prev.contactNumber ? prev : { ...prev, contactNumber: userData.mobile }));
    }
  }, [userData?.mobile]);

  useEffect(() => {
    if (!currentUser) return;
    const unsubDoubts = onSnapshot(
      query(collection(db, 'doubts'), where('studentId', '==', currentUser.uid)),
      (snap) => setDoubts(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => console.warn('StudentDashboard: could not load doubts:', err.message)
    );
    const unsubNotifs = onSnapshot(
      query(collection(db, 'notifications'), where('uid', '==', currentUser.uid), where('read', '==', false)),
      (snap) => setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => console.warn('StudentDashboard: could not load notifications:', err.message)
    );
    return () => { unsubDoubts(); unsubNotifs(); };
  }, [currentUser]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="animate-spin rounded-full h-7 w-7 border-2 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  const balance = (userData.totalFee || 0) - (userData.paidAmount || 0);
  const progressPercent =
    userData.totalFee > 0
      ? Math.min(100, Math.round((userData.paidAmount / userData.totalFee) * 100))
      : 0;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully.');
      navigate('/');
    } catch {
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleDoubtFormChange = (e) => {
    const { name, value } = e.target;
    setDoubtForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitDoubt = async (e) => {
    e.preventDefault();
    setSubmittingDoubt(true);
    try {
      await addDoc(collection(db, 'doubts'), {
        studentId: currentUser.uid,
        studentName: userData.name || '',
        studentEmail: userData.email || '',
        studentMobile: userData.mobile || '',
        topic: doubtForm.topic.trim(),
        description: doubtForm.description.trim(),
        preferredTime: doubtForm.preferredTime.trim(),
        contactNumber: doubtForm.contactNumber.trim(),
        status: 'pending',
        studentConfirmed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      toast.success('Doubt registered! An instructor will reach out soon.');
      setDoubtDialogOpen(false);

      // Best-effort admin email alert — the doubt is already saved either way, so
      // this runs after the dialog closes and only warns (doesn't block) on failure.
      sendDoubtEmail({
        type: 'new-doubt',
        topic: doubtForm.topic,
        description: doubtForm.description,
        preferredTime: doubtForm.preferredTime,
        contactNumber: doubtForm.contactNumber,
        studentName: userData.name,
        studentEmail: userData.email
      }).then(({ sent }) => {
        if (!sent) {
          toast.warning('Query saved, but the email alert to your instructor may not have gone through.');
        }
      });
      setDoubtForm({ ...emptyDoubtForm, contactNumber: userData.mobile || '' });
    } catch (err) {
      toast.error('Could not register doubt: ' + err.message);
    } finally {
      setSubmittingDoubt(false);
    }
  };

  const confirmResolved = async (d) => {
    setDoubtActionId(d.id);
    try {
      await updateDoc(doc(db, 'doubts', d.id), { studentConfirmed: true, confirmedAt: new Date().toISOString() });
      toast.success('Marked as resolved. Thanks for confirming!');
    } catch (err) { toast.error(err.message); }
    finally { setDoubtActionId(null); }
  };

  const reopenDoubt = async (d) => {
    setDoubtActionId(d.id);
    try {
      await updateDoc(doc(db, 'doubts', d.id), {
        status: 'in_progress',
        studentConfirmed: false,
        updatedAt: new Date().toISOString()
      });
      toast.success('Query reopened — an instructor has been notified.');
    } catch (err) { toast.error(err.message); }
    finally { setDoubtActionId(null); }
  };

  const deleteDoubt = async (d) => {
    setDoubtActionId(d.id);
    try {
      await deleteDoc(doc(db, 'doubts', d.id));
      toast.success('Query deleted.');
    } catch (err) { toast.error(err.message); }
    finally { setDoubtActionId(null); }
  };

  const markNotificationRead = async (n) => {
    try {
      await updateDoc(doc(db, 'notifications', n.id), { read: true });
    } catch (err) { console.warn('markNotificationRead failed:', err.message); }
  };

  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-6xl mx-auto min-h-screen">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-emerald-600" />
            Learning Suite
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5">
            Welcome back, <span className="font-semibold text-zinc-700">{userData.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifPanel((p) => !p)}
              className="relative h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotifPanel && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-zinc-200 rounded-xl shadow-xl z-40 overflow-hidden">
                <div className="px-3 py-2 border-b border-zinc-100 text-xs font-bold text-zinc-700">Notifications</div>
                {notifications.length === 0 ? (
                  <div className="px-3 py-6 text-center text-xs text-zinc-400">You're all caught up.</div>
                ) : (
                  <div className="max-h-72 overflow-y-auto divide-y divide-zinc-50">
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => markNotificationRead(n)}
                        className="w-full text-left px-3 py-2.5 hover:bg-zinc-50 transition-colors"
                      >
                        <p className="text-xs text-zinc-700 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-zinc-400 mt-1">Tap to dismiss</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Button
            size="sm"
            onClick={() => setDoubtDialogOpen(true)}
            className="text-xs rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-3"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5 mr-1.5" />
            Register a Doubt
          </Button>
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="text-xs rounded-lg border-zinc-200 text-zinc-600 hover:bg-zinc-50 h-8 px-3"
            >
              <Home className="w-3.5 h-3.5 mr-1.5" />
              Landing Page
            </Button>
          </Link>
          <Link to="/resources">
            <Button
              variant="outline"
              size="sm"
              className="text-xs rounded-lg border-emerald-200 text-emerald-700 hover:bg-emerald-50 h-8 px-3"
            >
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Resources
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-xs rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-50 h-8 px-3"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* ── Main Grid ───────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-12 gap-5">

        {/* Left: 8 cols */}
        <div className="lg:col-span-8 space-y-5">

          {/* Welcome Banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 text-white shadow-xl shadow-zinc-900/20">
            <div className="absolute top-0 right-0 p-8 opacity-[0.06] pointer-events-none">
              <BookOpen className="w-48 h-48 rotate-12" />
            </div>
            <div className="relative z-10 grid md:grid-cols-5 gap-5 items-center">
              {/* Left info */}
              <div className="md:col-span-3 space-y-3">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] px-2 py-0.5">
                  Enrolled
                </Badge>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  {userData.courseName}
                </h2>
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
                  <Milestone className="w-3.5 h-3.5 text-emerald-400" />
                  Cohort Participation Active
                </div>
              </div>

              {/* Progress widget */}
              <div className="md:col-span-2 bg-white/8 border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    Payment Progress
                  </span>
                  <span className="text-lg font-black">{progressPercent}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                  "The beautiful thing about learning is that no one can take it away from you."
                </p>
              </div>
            </div>
          </div>

          {/* Info Cards Row */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Course card */}
            <Card className="p-5 border-zinc-200/70 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Academy Status
                </span>
              </div>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase mb-1">Learning Track</p>
              <p className="text-base font-bold text-zinc-900 leading-tight">{userData.courseName}</p>
              <div className="mt-3 flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Curriculum Access Granted
              </div>
            </Card>

            {/* College card */}
            <Card className="p-5 border-zinc-200/70 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <BookOpen className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Enrollment Details
                </span>
              </div>
              <p className="text-[10px] font-semibold text-zinc-400 uppercase mb-1">Affiliated College</p>
              <p className="text-base font-bold text-zinc-900 leading-tight truncate">{userData.college}</p>
              <div className="mt-3 text-zinc-400 text-[10px] font-medium">
                Verified on{' '}
                {userData.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })
                  : 'N/A'}
              </div>
            </Card>
          </div>
        </div>

        {/* Right: 4 cols */}
        <div className="lg:col-span-4 space-y-4">

          {/* Financial Card */}
          <Card className="p-5 border-none bg-emerald-600 text-white shadow-xl shadow-emerald-900/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform pointer-events-none">
              <CreditCard className="w-24 h-24" />
            </div>
            <div className="relative z-10 space-y-5">
              <div className="space-y-1">
                <h3 className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest">
                  Financial Summary
                </h3>
                <div className="flex items-end gap-1">
                  <span className="text-[10px] text-emerald-200 mb-1">₹</span>
                  <div className="text-4xl font-extrabold leading-none tracking-tight">
                    {(userData.paidAmount || 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <p className="text-emerald-200/70 text-[10px]">Total amount deposited</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-white/15 pb-3">
                  <span className="text-emerald-100">Program Fee</span>
                  <span className="font-bold">₹{(userData.totalFee || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100 text-xs">Outstanding Dues</span>
                  <Badge
                    className={`border-none text-[10px] px-2 py-0.5 ${
                      balance > 0 ? 'bg-white text-emerald-800' : 'bg-emerald-400/50 text-white'
                    }`}
                  >
                    {balance > 0 ? `₹${balance.toLocaleString('en-IN')} pending` : 'Cleared ✓'}
                  </Badge>
                </div>
              </div>

              <Button className="w-full bg-white/15 hover:bg-white/25 border border-white/20 text-white font-semibold text-xs rounded-lg h-9 group shadow-sm">
                View Full Ledger
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </Card>

          {/* Security Info */}
          <Card className="p-4 border-zinc-200/70 shadow-sm">
            <div className="flex items-center gap-3 border-b border-zinc-100 pb-3 mb-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 text-sm">Security Lock</h4>
                <p className="text-[10px] text-zinc-400">Single-device session</p>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 leading-relaxed mb-3">
              This portal allows <strong>one active session</strong> at a time. Your device fingerprint
              is logged for security audits.
            </p>
            <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-semibold text-zinc-700">Active Identifier</span>
              </div>
              <p className="text-[9px] font-mono text-zinc-400 truncate">
                {userData.lastDeviceId || 'AUTH_TOKEN_ENCRYPTED'}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* ── My Doubts ───────────────────────────────────────────────────── */}
      <Card className="mt-5 border-zinc-200/70 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-zinc-100">
          <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <MessageCircleQuestion className="w-4 h-4 text-emerald-600" />
            My Doubts
            <span className="text-xs font-normal text-zinc-400">({doubts.length})</span>
          </h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setDoubtDialogOpen(true)}
            className="h-8 text-xs rounded-lg border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-3"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5 mr-1.5" />
            Register New
          </Button>
        </div>

        {doubts.length === 0 ? (
          <div className="py-12 text-center text-zinc-400 text-sm">
            No doubts registered yet. Stuck on something? Register one and an instructor will reach out.
          </div>
        ) : (
          <div className="divide-y divide-zinc-50">
            {[...doubts]
              .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
              .map((d) => (
                <div key={d.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-zinc-900 text-sm">{d.topic}</span>
                        <DoubtStatusBadge status={d.status} studentConfirmed={d.studentConfirmed} />
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{d.description}</p>
                      <div className="flex items-center gap-4 mt-2 flex-wrap text-[11px] text-zinc-400">
                        {d.preferredTime && (
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {d.preferredTime}</span>
                        )}
                        {d.contactNumber && (
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {d.contactNumber}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {d.status === 'resolved' && !d.studentConfirmed && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => confirmResolved(d)}
                            disabled={doubtActionId === d.id}
                            className="h-7 text-[11px] rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-2.5"
                          >
                            {doubtActionId === d.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm Resolved'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => reopenDoubt(d)}
                            disabled={doubtActionId === d.id}
                            className="h-7 text-[11px] rounded-lg border-amber-200 text-amber-700 hover:bg-amber-50 px-2.5"
                          >
                            <RotateCcw className="w-3 h-3 mr-1" /> Still an Issue
                          </Button>
                        </>
                      )}
                      <button
                        onClick={() => deleteDoubt(d)}
                        disabled={doubtActionId === d.id}
                        className="p-1.5 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete query"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Card>

      {/* ── Register a Doubt dialog ─────────────────────────────────────── */}
      <Dialog open={doubtDialogOpen} onOpenChange={setDoubtDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register a Doubt</DialogTitle>
            <DialogDescription>
              Tell us what you're stuck on — an instructor will reach out at your preferred time.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitDoubt} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-zinc-600">About the doubt</Label>
              <Input
                name="topic" required value={doubtForm.topic}
                onChange={handleDoubtFormChange}
                placeholder="e.g. React useEffect not re-running"
                className="h-9 text-sm rounded-lg"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-zinc-600">Description</Label>
              <Textarea
                name="description" required value={doubtForm.description}
                onChange={handleDoubtFormChange}
                placeholder="Explain what you tried and where you're stuck…"
                className="text-sm min-h-[90px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-600">When are you free?</Label>
                <Input
                  name="preferredTime" required value={doubtForm.preferredTime}
                  onChange={handleDoubtFormChange}
                  placeholder="e.g. Weekdays 6–8 PM"
                  className="h-9 text-sm rounded-lg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-600">Contact Number</Label>
                <Input
                  name="contactNumber" required value={doubtForm.contactNumber}
                  onChange={handleDoubtFormChange}
                  placeholder="98765 43210"
                  className="h-9 text-sm rounded-lg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={submittingDoubt}
                className="w-full sm:w-auto h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm px-5"
              >
                {submittingDoubt ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-3.5 h-3.5" /> Register Doubt
                  </span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
