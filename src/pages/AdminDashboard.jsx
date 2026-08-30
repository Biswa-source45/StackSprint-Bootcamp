import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getApps, initializeApp as initApp } from 'firebase/app';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { parseDriveLink } from '../lib/driveLink';
import { flattenLegacyResources } from '../lib/legacyResourcesSeed';
import { sendDoubtEmail } from '../lib/notify';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../components/ui/alert-dialog';
import {
  Plus,
  Trash2,
  LogOut,
  UserPlus,
  BookOpen,
  CreditCard,
  Edit,
  CheckCircle,
  XCircle,
  RefreshCcw,
  Users,
  IndianRupee,
  TrendingUp,
  Wallet,
  ArrowRight,
  Home,
  LayoutGrid,
  Download,
  FolderKanban,
  MonitorPlay,
  FileText,
  UploadCloud,
  Link2,
  MessageCircleQuestion,
  Clock,
  Phone
} from 'lucide-react';

// ── Secondary Firebase app (for creating students without logging out admin) ──
let secondaryAuth;
try {
  const cfg = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };
  if (cfg.apiKey) {
    const app = getApps().find((a) => a.name === 'Secondary') || initApp(cfg, 'Secondary');
    secondaryAuth = getAuth(app);
  }
} catch (e) {
  console.warn('Secondary Firebase init failed:', e);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const emptyStudentForm = {
  name: '', email: '', mobile: '', college: '',
  courseId: '', paymentStatus: 'no', paidAmount: 0, totalFee: 0
};

const TABS = [
  { key: 'students', label: 'Students', Icon: Users },
  { key: 'addStudent', label: 'Enroll', Icon: UserPlus },
  { key: 'courses', label: 'Courses', Icon: BookOpen },
  { key: 'resources', label: 'Resources', Icon: FolderKanban },
  { key: 'queries', label: 'Student Queries', Icon: MessageCircleQuestion }
];

const emptyResourceForm = { kind: 'video', topic: '', title: '', description: '', driveShareLink: '' };

const RESOURCE_KIND_TABS = [
  { key: 'video', label: 'Video Lectures', Icon: MonitorPlay },
  { key: 'note', label: 'Notes & Docs', Icon: FileText }
];

const DOUBT_STATUS_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'resolved', label: 'Resolved' }
];

// ── Stat mini-card ─────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color = 'emerald' }) {
  const colorMap = {
    emerald: 'text-emerald-600 bg-emerald-50',
    blue: 'text-blue-600 bg-blue-50',
    teal: 'text-teal-600 bg-teal-50',
    orange: 'text-orange-600 bg-orange-50'
  };
  return (
    <Card className="p-4 border-zinc-200/70 shadow-sm hover:shadow-md transition-shadow">
      <div className={`inline-flex p-2 rounded-lg mb-3 ${colorMap[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-2xl font-extrabold text-zinc-900">{value}</div>
    </Card>
  );
}

// ── Payment status badge ───────────────────────────────────────────────────
function PayBadge({ status }) {
  if (status === 'yes')
    return <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px] px-2 py-0.5">Paid</Badge>;
  if (status === 'partial')
    return <Badge className="bg-amber-100 text-amber-700 border-none text-[10px] px-2 py-0.5">Partial</Badge>;
  return <Badge className="bg-red-100 text-red-700 border-none text-[10px] px-2 py-0.5">Unpaid</Badge>;
}

// ── Doubt status badge ─────────────────────────────────────────────────────
function DoubtStatusBadge({ status, studentConfirmed }) {
  if (status === 'resolved') {
    return studentConfirmed ? (
      <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px] px-2 py-0.5">Resolved</Badge>
    ) : (
      <Badge className="bg-blue-100 text-blue-700 border-none text-[10px] px-2 py-0.5">
        Resolved — awaiting student confirmation
      </Badge>
    );
  }
  if (status === 'in_progress')
    return <Badge className="bg-amber-100 text-amber-700 border-none text-[10px] px-2 py-0.5">In Progress</Badge>;
  return <Badge className="bg-zinc-100 text-zinc-600 border-none text-[10px] px-2 py-0.5">Pending</Badge>;
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('students');

  const [courseForm, setCourseForm] = useState({ name: '', fees: '' });
  const [studentForm, setStudentForm] = useState(emptyStudentForm);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Confirmation dialog state
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [studentToLogout, setStudentToLogout] = useState(null);

  // ── Resources tab state ──────────────────────────────────────────────────
  const [resources, setResources] = useState([]);
  const [resourceKind, setResourceKind] = useState('video');
  const [resourceForm, setResourceForm] = useState(emptyResourceForm);
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [savingResource, setSavingResource] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [importingLegacy, setImportingLegacy] = useState(false);

  // ── Student Queries (doubts) tab state ───────────────────────────────────
  const [doubts, setDoubts] = useState([]);
  const [doubtStatusFilter, setDoubtStatusFilter] = useState('all');
  const [doubtActionLoading, setDoubtActionLoading] = useState(false);

  // ── Real-time listeners ──────────────────────────────────────────────────
  useEffect(() => {
    const unsubCourses = onSnapshot(
      collection(db, 'courses'),
      (snap) => setCourses(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => toast.error('Cannot load courses: ' + err.message, { id: 'courses-err' })
    );
    const unsubStudents = onSnapshot(
      collection(db, 'users'),
      (snap) =>
        setStudents(
          snap.docs
            .filter((d) => d.data().role !== 'admin')
            .map((d) => ({ id: d.id, ...d.data() }))
        ),
      (err) => toast.error('Cannot load students: ' + err.message, { id: 'students-err' })
    );
    const unsubResources = onSnapshot(
      collection(db, 'resources'),
      (snap) => setResources(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => toast.error('Cannot load resources: ' + err.message, { id: 'resources-err' })
    );
    const unsubDoubts = onSnapshot(
      collection(db, 'doubts'),
      (snap) => setDoubts(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => toast.error('Cannot load student queries: ' + err.message, { id: 'doubts-err' })
    );
    return () => { unsubCourses(); unsubStudents(); unsubResources(); unsubDoubts(); };
  }, []);

  // ── Course handlers ──────────────────────────────────────────────────────
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!courseForm.name || !courseForm.fees) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'courses'), {
        name: courseForm.name,
        fees: Number(courseForm.fees)
      });
      setCourseForm({ name: '', fees: '' });
      toast.success('Course added!');
    } catch (err) {
      toast.error('Failed: ' + err.message);
    } finally { setLoading(false); }
  };

  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;
    try {
      await deleteDoc(doc(db, 'courses', courseToDelete));
      toast.success('Course deleted.');
    } catch (err) { toast.error(err.message); }
    setCourseToDelete(null);
  };

  // ── Student form handlers ────────────────────────────────────────────────
  const handleStudentFormChange = (e) => {
    const { name, value } = e.target;
    setStudentForm((prev) => {
      if (name === 'courseId') {
        const course = courses.find((c) => c.id === value);
        return {
          ...prev,
          courseId: value,
          totalFee: course ? course.fees : 0,
          paidAmount:
            prev.paymentStatus === 'yes' ? (course ? course.fees : 0) : prev.paidAmount
        };
      }
      if (name === 'paymentStatus') {
        if (value === 'yes') return { ...prev, paymentStatus: 'yes', paidAmount: prev.totalFee };
        if (value === 'no') return { ...prev, paymentStatus: 'no', paidAmount: 0 };
        return { ...prev, paymentStatus: value };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (Number(studentForm.paidAmount) > Number(studentForm.totalFee))
        throw new Error('Paid amount cannot exceed the total course fee.');

      let uid = editingStudentId;

      if (!uid) {
        if (!secondaryAuth)
          throw new Error('Student registration service unavailable. Check environment variables.');
        const firstName = studentForm.name.trim().split(' ')[0];
        const password = `${firstName}@${studentForm.mobile.slice(-4)}`;
        const cr = await createUserWithEmailAndPassword(secondaryAuth, studentForm.email, password);
        uid = cr.user.uid;
        toast.success(`Student created! Password: ${password}`, { duration: 12000 });
      } else {
        toast.success('Student record updated!');
      }

      const data = {
        name: studentForm.name,
        email: studentForm.email,
        mobile: studentForm.mobile,
        college: studentForm.college,
        courseId: studentForm.courseId,
        courseName: courses.find((c) => c.id === studentForm.courseId)?.name ?? '',
        paymentStatus: studentForm.paymentStatus,
        paidAmount: Number(studentForm.paidAmount),
        totalFee: Number(studentForm.totalFee),
        role: 'student',
        updatedAt: new Date().toISOString()
      };
      if (!editingStudentId) {
        data.isLoggedIn = false;
        data.createdAt = new Date().toISOString();
      }

      await setDoc(doc(db, 'users', uid), data, { merge: true });
      setStudentForm(emptyStudentForm);
      setEditingStudentId(null);
      setActiveTab('students');
    } catch (err) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'users', studentToDelete));
      toast.success('Student record deleted.');
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); setStudentToDelete(null); }
  };

  const confirmForceLogout = async () => {
    if (!studentToLogout) return;
    try {
      await updateDoc(doc(db, 'users', studentToLogout), {
        isLoggedIn: false,
        lastDeviceId: null
      });
      toast.success('User session reset.');
    } catch (err) { toast.error(err.message); }
    setStudentToLogout(null);
  };

  const editStudent = (s) => {
    setEditingStudentId(s.id);
    setStudentForm({
      name: s.name,
      email: s.email,
      mobile: s.mobile,
      college: s.college,
      courseId: s.courseId,
      paymentStatus: s.paymentStatus,
      paidAmount: s.paidAmount,
      totalFee: s.totalFee
    });
    setActiveTab('addStudent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingStudentId(null);
    setStudentForm(emptyStudentForm);
    setActiveTab('students');
  };

  // ── Resource handlers ────────────────────────────────────────────────────
  const resourcesOfKind = resources
    .filter((r) => r.kind === resourceKind)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleResourceFormChange = (e) => {
    const { name, value } = e.target;
    setResourceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveResource = async (e) => {
    e.preventDefault();
    setSavingResource(true);
    try {
      let embedUrl = '';
      let driveUrl = '';
      if (resourceForm.kind === 'note') {
        // Notes just link out — no iframe embed needed, but still normalize via the
        // Drive parser when the link looks like a Drive link so "Open" always works.
        try {
          ({ driveUrl } = parseDriveLink(resourceForm.driveShareLink));
        } catch {
          driveUrl = resourceForm.driveShareLink.trim();
        }
      } else {
        const parsed = parseDriveLink(resourceForm.driveShareLink);
        embedUrl = parsed.embedUrl;
        driveUrl = parsed.driveUrl;
      }

      const data = {
        kind: resourceForm.kind,
        topic: resourceForm.topic.trim(),
        title: resourceForm.title.trim(),
        description: resourceForm.description.trim(),
        driveShareLink: resourceForm.driveShareLink.trim(),
        embedUrl,
        driveUrl,
        updatedAt: new Date().toISOString()
      };

      if (editingResourceId) {
        // Deliberately not touching `order` here — editing shouldn't reshuffle position.
        await updateDoc(doc(db, 'resources', editingResourceId), data);
        toast.success('Resource updated!');
      } else {
        data.createdAt = new Date().toISOString();
        // New resources sort after everything else — Date.now() is comfortably larger
        // than the small sequential indices the legacy import assigns.
        data.order = Date.now();
        await addDoc(collection(db, 'resources'), data);
        toast.success('Resource added!');
      }
      setResourceForm({ ...emptyResourceForm, kind: resourceForm.kind });
      setEditingResourceId(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingResource(false);
    }
  };

  const editResource = (r) => {
    setEditingResourceId(r.id);
    setResourceForm({
      kind: r.kind,
      topic: r.topic || '',
      title: r.title || '',
      description: r.description || '',
      driveShareLink: r.driveShareLink || r.driveUrl || ''
    });
    setResourceKind(r.kind);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditResource = () => {
    setEditingResourceId(null);
    setResourceForm({ ...emptyResourceForm, kind: resourceKind });
  };

  const confirmDeleteResource = async () => {
    if (!resourceToDelete) return;
    try {
      await deleteDoc(doc(db, 'resources', resourceToDelete));
      toast.success('Resource deleted.');
    } catch (err) { toast.error(err.message); }
    setResourceToDelete(null);
  };

  const handleImportLegacyCurriculum = async () => {
    setImportingLegacy(true);
    try {
      const items = flattenLegacyResources();
      const now = new Date().toISOString();
      // `order` preserves the curriculum's intended sequence (GitHub -> CSS -> JS ->
      // React -> Express -> MongoDB, lecture 1/2/3... within each) — every item in one
      // batch getting the same `createdAt` means createdAt alone can't be sorted on.
      for (let i = 0; i < items.length; i++) {
        await addDoc(collection(db, 'resources'), { ...items[i], order: i, createdAt: now, updatedAt: now });
      }
      toast.success(`Imported ${items.length} existing resources into the library.`);
    } catch (err) {
      toast.error('Import failed: ' + err.message);
    } finally {
      setImportingLegacy(false);
    }
  };

  // ── Student query (doubt) handlers ───────────────────────────────────────
  const filteredDoubts = doubts
    .filter((d) => doubtStatusFilter === 'all' || d.status === doubtStatusFilter)
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

  const notifyStudent = async ({ uid, message, doubtId, email, subject }) => {
    try {
      await addDoc(collection(db, 'notifications'), {
        uid,
        message,
        doubtId,
        read: false,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn('notifyStudent: could not write in-app notification:', err.message);
    }
    const { sent, error } = await sendDoubtEmail({ type: 'status-update', to: email, subject, message });
    if (!sent) {
      toast.warning('Student notified in-app, but the email alert may not have gone through.', {
        description: error
      });
    }
  };

  const acceptDoubt = async (d) => {
    setDoubtActionLoading(true);
    try {
      await updateDoc(doc(db, 'doubts', d.id), {
        status: 'in_progress',
        acceptedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      await notifyStudent({
        uid: d.studentId,
        doubtId: d.id,
        email: d.studentEmail,
        subject: `Your doubt "${d.topic}" is now in progress`,
        message: `Good news — an instructor has accepted your query about "${d.topic}" and is working on it.`
      });
      toast.success('Query accepted — student notified.');
    } catch (err) { toast.error(err.message); }
    finally { setDoubtActionLoading(false); }
  };

  const resolveDoubt = async (d) => {
    setDoubtActionLoading(true);
    try {
      await updateDoc(doc(db, 'doubts', d.id), {
        status: 'resolved',
        studentConfirmed: false,
        resolvedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      await notifyStudent({
        uid: d.studentId,
        doubtId: d.id,
        email: d.studentEmail,
        subject: `Your doubt "${d.topic}" has been marked resolved`,
        message: `Your query about "${d.topic}" has been marked resolved. Please confirm in your dashboard once you're satisfied, or reopen it if it isn't.`
      });
      toast.success('Marked resolved — student notified to confirm.');
    } catch (err) { toast.error(err.message); }
    finally { setDoubtActionLoading(false); }
  };

  // ── Revenue calculations ─────────────────────────────────────────────────
  const totalRevenue = students.reduce((a, s) => a + (s.paidAmount || 0), 0);
  const totalOutstanding = students.reduce(
    (a, s) => a + ((s.totalFee || 0) - (s.paidAmount || 0)),
    0
  );

  // ── CSV Export ───────────────────────────────────────────────────────────
  const handleExportCSV = () => {
    if (!students || students.length === 0) {
      toast.error('No student records available to export.');
      return;
    }

    try {
      const headers = [
        'Student Name',
        'Email Address',
        'Contact Number',
        'College / Institute',
        'Enrolled Course',
        'Payment Status',
        'Total Fee (INR)',
        'Amount Paid (INR)',
        'Pending Amount (INR)',
        'Session Status',
        'Enrollment Date'
      ];

      const escapeCsv = (val) => {
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      };

      const rows = students.map((s) => {
        const name = s.name || '';
        const email = s.email || '';
        const mobile = s.mobile || '';
        const college = s.college || '';
        const course = s.courseName || '—';

        let payStatus = 'Unpaid';
        if (s.paymentStatus === 'yes') payStatus = 'Paid in Full';
        else if (s.paymentStatus === 'partial') payStatus = 'Partial Payment';

        const totalFee = Number(s.totalFee || 0);
        const paidAmount = Number(s.paidAmount || 0);
        const pendingAmount = Math.max(0, totalFee - paidAmount);
        const sessionStatus = s.isLoggedIn ? 'Active' : 'Offline';

        let enrollDate = '—';
        if (s.createdAt) {
          try {
            enrollDate = new Date(s.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            });
          } catch (e) {
            enrollDate = s.createdAt;
          }
        }

        return [
          escapeCsv(name),
          escapeCsv(email),
          escapeCsv(mobile),
          escapeCsv(college),
          escapeCsv(course),
          escapeCsv(payStatus),
          totalFee,
          paidAmount,
          pendingAmount,
          escapeCsv(sessionStatus),
          escapeCsv(enrollDate)
        ].join(',');
      });

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.setAttribute('href', url);
      link.setAttribute('download', `StackSprint_Students_Directory_${dateStr}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Exported ${students.length} student record(s) to CSV!`);
    } catch (err) {
      console.error('Export CSV error:', err);
      toast.error('Failed to export student data: ' + err.message);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="pt-20 pb-12 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-emerald-600" />
            Admin Control
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">Manage bootcamp operations</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Landing page link */}
          <Link to="/">
            <Button variant="outline" size="sm" className="h-8 text-xs rounded-lg border-zinc-200 text-zinc-600 hover:bg-zinc-50 px-3">
              <Home className="w-3.5 h-3.5 mr-1.5" />
              Landing Page
            </Button>
          </Link>

          {/* Sign Out */}
          <Button
            variant="outline"
            size="sm"
            onClick={async () => { await logout(); navigate('/'); }}
            className="h-8 text-xs rounded-lg border-red-100 text-red-500 hover:bg-red-50 px-3"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            Sign Out
          </Button>

          {/* Tab switcher */}
          <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
            {TABS.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => {
                  if (key !== 'addStudent') setEditingStudentId(null);
                  setActiveTab(key);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === key
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {key === 'addStudent' && editingStudentId ? 'Edit' : label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard icon={Users} label="Total Students" value={students.length} color="emerald" />
        <StatCard icon={BookOpen} label="Active Courses" value={courses.length} color="blue" />
        <StatCard
          icon={IndianRupee}
          label="Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          color="teal"
        />
        <StatCard
          icon={TrendingUp}
          label="Outstanding"
          value={`₹${totalOutstanding.toLocaleString('en-IN')}`}
          color="orange"
        />
      </div>

      {/* ════════════ STUDENTS TAB ════════════════════════════════════════ */}
      {activeTab === 'students' && (
        <Card className="border-zinc-200/70 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-zinc-100">
            <h2 className="text-sm font-bold text-zinc-900">
              Student Directory
              <span className="ml-2 text-xs font-normal text-zinc-400">({students.length})</span>
            </h2>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportCSV}
                className="h-8 text-xs rounded-lg border-zinc-200 text-zinc-700 hover:bg-zinc-50 px-3 transition-colors"
                title="Export student directory to CSV spreadsheet"
              >
                <Download className="w-3.5 h-3.5 mr-1.5 text-zinc-500" />
                Export Data
              </Button>
              <Button
                size="sm"
                onClick={() => setActiveTab('addStudent')}
                className="h-8 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3"
              >
                <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                Enroll Student
              </Button>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="py-16 text-center text-zinc-400 text-sm">
              No students enrolled yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.15em] border-b border-zinc-100">
                    <th className="px-5 py-3 font-bold">Student</th>
                    <th className="px-4 py-3 font-bold">Course</th>
                    <th className="px-4 py-3 text-center font-bold">Payment</th>
                    <th className="px-4 py-3 text-center font-bold">Fees</th>
                    <th className="px-4 py-3 text-center font-bold">Session</th>
                    <th className="px-5 py-3 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {students.map((s) => (
                    <tr key={s.id} className="hover:bg-zinc-50/60 transition-colors group">
                      {/* Student identity */}
                      <td className="px-5 py-3">
                        <div className="font-semibold text-zinc-900 text-sm leading-tight">{s.name}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{s.email}</div>
                      </td>

                      {/* Course */}
                      <td className="px-4 py-3">
                        <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit mb-1 max-w-[160px] truncate">
                          {s.courseName || '—'}
                        </div>
                        <div className="text-[10px] text-zinc-400 max-w-[150px] truncate">{s.college}</div>
                      </td>

                      {/* Payment badge */}
                      <td className="px-4 py-3 text-center">
                        <PayBadge status={s.paymentStatus} />
                      </td>

                      {/* Fees */}
                      <td className="px-4 py-3 text-center">
                        <div className="text-xs font-bold text-zinc-800">₹{(s.paidAmount || 0).toLocaleString('en-IN')}</div>
                        <div className="text-[10px] text-zinc-400">of ₹{(s.totalFee || 0).toLocaleString('en-IN')}</div>
                      </td>

                      {/* Live session dot */}
                      <td className="px-4 py-3 text-center">
                        {s.isLoggedIn ? (
                          <button
                            onClick={() => setStudentToLogout(s.id)}
                            className="group/dot flex flex-col items-center mx-auto"
                            title="Click to force logout"
                          >
                            <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse" />
                            <span className="text-[9px] text-red-500 font-bold opacity-0 group-hover/dot:opacity-100 transition-opacity mt-0.5">
                              Kick
                            </span>
                          </button>
                        ) : (
                          <span className="w-1.5 h-1.5 bg-zinc-200 rounded-full block mx-auto" />
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => editStudent(s)}
                            className="p-1.5 text-zinc-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                            title="Edit student"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setStudentToDelete(s.id)}
                            className="p-1.5 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* ════════════ ADD / EDIT STUDENT TAB ════════════════════════════ */}
      {activeTab === 'addStudent' && (
        <Card className="border-zinc-200/70 shadow-sm max-w-2xl mx-auto">
          <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-zinc-900">
                {editingStudentId ? 'Edit Student Record' : 'Enroll New Student'}
              </h2>
              <p className="text-[10px] text-zinc-400 mt-0.5">Fill all required fields to proceed.</p>
            </div>
            {editingStudentId && (
              <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-xs h-7 px-2.5 rounded-lg">
                Cancel
              </Button>
            )}
          </div>

          <form onSubmit={handleCreateStudent} className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-600">Full Name</Label>
                <Input
                  name="name" required value={studentForm.name}
                  onChange={handleStudentFormChange}
                  placeholder="Rahul Sharma"
                  className="h-9 text-sm rounded-lg"
                />
              </div>
              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-600">Email</Label>
                <Input
                  type="email" name="email" required value={studentForm.email}
                  onChange={handleStudentFormChange}
                  disabled={!!editingStudentId}
                  placeholder="rahul@example.com"
                  className="h-9 text-sm rounded-lg disabled:opacity-60"
                />
              </div>
              {/* Phone */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-600">Phone</Label>
                <Input
                  name="mobile" required value={studentForm.mobile}
                  onChange={handleStudentFormChange}
                  placeholder="98765 43210"
                  className="h-9 text-sm rounded-lg"
                />
              </div>
              {/* College */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-600">College / Institute</Label>
                <Input
                  name="college" required value={studentForm.college}
                  onChange={handleStudentFormChange}
                  placeholder="MIT, Pune"
                  className="h-9 text-sm rounded-lg"
                />
              </div>
              {/* Course */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-600">Program</Label>
                <select
                  name="courseId" required value={studentForm.courseId}
                  onChange={handleStudentFormChange}
                  className="w-full h-9 text-sm rounded-lg border border-zinc-200 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition"
                >
                  <option value="">Select a program…</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — ₹{c.fees.toLocaleString('en-IN')}
                    </option>
                  ))}
                </select>
              </div>
              {/* Payment Status */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-600">Payment Status</Label>
                <select
                  name="paymentStatus" value={studentForm.paymentStatus}
                  onChange={handleStudentFormChange}
                  className="w-full h-9 text-sm rounded-lg border border-zinc-200 bg-white px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400 transition"
                >
                  <option value="no">Unpaid</option>
                  <option value="partial">Partial Payment</option>
                  <option value="yes">Paid in Full</option>
                </select>
              </div>
            </div>

            {/* Financial Ledger — only when not unpaid */}
            {studentForm.paymentStatus !== 'no' && (
              <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                    Financial Ledger
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setStudentForm((p) => ({ ...p, paidAmount: p.totalFee, paymentStatus: 'yes' }))
                    }
                    className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 underline"
                  >
                    Set as Full Payment
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-bold text-emerald-700 mb-1 uppercase">Program Fee</div>
                    <div className="text-xl font-extrabold text-emerald-950">
                      ₹{Number(studentForm.totalFee).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-emerald-700 mb-1 uppercase">Deposited (₹)</div>
                    <input
                      type="number"
                      name="paidAmount"
                      value={studentForm.paidAmount}
                      onChange={handleStudentFormChange}
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg font-bold shadow-sm outline-none transition ${
                        Number(studentForm.paidAmount) > Number(studentForm.totalFee)
                          ? 'border-red-400 text-red-600 ring-2 ring-red-100'
                          : 'border-emerald-200 text-emerald-900 focus:ring-2 focus:ring-emerald-200'
                      }`}
                    />
                    {Number(studentForm.paidAmount) > Number(studentForm.totalFee) && (
                      <p className="text-[10px] text-red-600 font-bold mt-1 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Exceeds fee limit
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || Number(studentForm.paidAmount) > Number(studentForm.totalFee)}
              className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg font-semibold text-sm shadow-md transition-all active:scale-[0.99] group mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCcw className="w-4 h-4 animate-spin" /> Processing…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {editingStudentId ? 'Update Record' : 'Secure Enrollment'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        </Card>
      )}

      {/* ════════════ COURSES TAB ════════════════════════════════════════ */}
      {activeTab === 'courses' && (
        <div className="grid lg:grid-cols-12 gap-5">
          {/* Add Course Form */}
          <Card className="lg:col-span-4 border-zinc-200/70 shadow-sm h-fit">
            <div className="px-5 py-4 border-b border-zinc-100">
              <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                New Program
              </h2>
            </div>
            <form onSubmit={handleAddCourse} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-600">Course Title</Label>
                <Input
                  required
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  placeholder="Full Stack 2024"
                  className="h-9 text-sm rounded-lg"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-zinc-600">Fee Amount (₹)</Label>
                <Input
                  type="number"
                  required
                  value={courseForm.fees}
                  onChange={(e) => setCourseForm({ ...courseForm, fees: e.target.value })}
                  placeholder="5000"
                  className="h-9 text-sm rounded-lg"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm"
              >
                {loading ? <RefreshCcw className="w-4 h-4 animate-spin mx-auto" /> : 'Add Course'}
              </Button>
            </form>
          </Card>

          {/* Course List */}
          <Card className="lg:col-span-8 border-zinc-200/70 shadow-sm">
            <div className="px-5 py-4 border-b border-zinc-100">
              <h2 className="text-sm font-bold text-zinc-900">
                Course Directory
                <span className="ml-2 text-xs font-normal text-zinc-400">({courses.length})</span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.15em] border-b border-zinc-50">
                    <th className="px-5 py-3 font-bold">Course Name</th>
                    <th className="px-4 py-3 font-bold">Fee</th>
                    <th className="px-4 py-3 font-bold">Students</th>
                    <th className="px-5 py-3 text-right font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {courses.map((c) => {
                    const enrolled = students.filter((s) => s.courseId === c.id).length;
                    return (
                      <tr key={c.id} className="hover:bg-zinc-50/60 transition-colors">
                        <td className="px-5 py-3 font-semibold text-sm text-zinc-900">{c.name}</td>
                        <td className="px-4 py-3 text-emerald-700 font-bold text-sm">
                          ₹{c.fees.toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-3">
                          <Badge className="bg-blue-50 text-blue-700 border-none text-[10px] px-2 py-0.5">
                            {enrolled} enrolled
                          </Badge>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            onClick={() => setCourseToDelete(c.id)}
                            className="p-1.5 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-5 py-10 text-center text-zinc-400 text-sm">
                        No courses added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ════════════ RESOURCES TAB ════════════════════════════════════════ */}
      {activeTab === 'resources' && (
        <div className="space-y-5">
          {/* Kind switcher */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 w-fit">
              {RESOURCE_KIND_TABS.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setResourceKind(key);
                    setEditingResourceId(null);
                    setResourceForm({ ...emptyResourceForm, kind: key });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    resourceKind === key ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {resources.length === 0 && (
              <Button
                size="sm"
                onClick={handleImportLegacyCurriculum}
                disabled={importingLegacy}
                className="h-8 text-xs rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white px-3"
              >
                {importingLegacy ? (
                  <RefreshCcw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                ) : (
                  <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
                )}
                Import Existing Curriculum
              </Button>
            )}
          </div>

          <div className="grid lg:grid-cols-12 gap-5">
            {/* Add / Edit Resource Form */}
            <Card className="lg:col-span-4 border-zinc-200/70 shadow-sm h-fit">
              <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-600" />
                  {editingResourceId ? 'Edit Resource' : 'Add Resource'}
                </h2>
                {editingResourceId && (
                  <Button variant="ghost" size="sm" onClick={cancelEditResource} className="text-xs h-7 px-2.5 rounded-lg">
                    Cancel
                  </Button>
                )}
              </div>
              <form onSubmit={handleSaveResource} className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-600">
                    {resourceForm.kind === 'note' ? 'Note Title' : 'Title'}
                  </Label>
                  <Input
                    name="title" required value={resourceForm.title}
                    onChange={handleResourceFormChange}
                    placeholder={resourceForm.kind === 'video' ? 'CSS — Lecture 9' : 'Title'}
                    className="h-9 text-sm rounded-lg"
                  />
                </div>

                {resourceForm.kind !== 'note' && (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-zinc-600">
                      Topic (groups lectures together)
                    </Label>
                    <Input
                      name="topic" required value={resourceForm.topic}
                      onChange={handleResourceFormChange}
                      list="resource-topics"
                      placeholder="CSS"
                      className="h-9 text-sm rounded-lg"
                    />
                    <datalist id="resource-topics">
                      {[...new Set(resources.filter((r) => r.kind === resourceForm.kind).map((r) => r.topic))].map((t) => (
                        <option key={t} value={t} />
                      ))}
                    </datalist>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-600">Description</Label>
                  <Textarea
                    name="description" required value={resourceForm.description}
                    onChange={handleResourceFormChange}
                    placeholder="What this covers…"
                    className="text-sm min-h-[70px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-600 flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5" /> Google Drive Share Link
                  </Label>
                  <Input
                    name="driveShareLink" required value={resourceForm.driveShareLink}
                    onChange={handleResourceFormChange}
                    placeholder="https://drive.google.com/file/d/…/view?usp=sharing"
                    className="h-9 text-sm rounded-lg font-mono text-xs"
                  />
                  <p className="text-[10px] text-zinc-400">
                    Paste the normal "Share" link — the preview / download links are generated automatically.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={savingResource}
                  className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg font-semibold text-sm shadow-md transition-all mt-2"
                >
                  {savingResource ? (
                    <RefreshCcw className="w-4 h-4 animate-spin mx-auto" />
                  ) : editingResourceId ? (
                    'Update Resource'
                  ) : (
                    'Add Resource'
                  )}
                </Button>
              </form>
            </Card>

            {/* Resource List */}
            <Card className="lg:col-span-8 border-zinc-200/70 shadow-sm">
              <div className="px-5 py-4 border-b border-zinc-100">
                <h2 className="text-sm font-bold text-zinc-900">
                  {RESOURCE_KIND_TABS.find((t) => t.key === resourceKind)?.label}
                  <span className="ml-2 text-xs font-normal text-zinc-400">({resourcesOfKind.length})</span>
                </h2>
              </div>
              {resourcesOfKind.length === 0 ? (
                <div className="py-16 text-center text-zinc-400 text-sm">
                  No {RESOURCE_KIND_TABS.find((t) => t.key === resourceKind)?.label.toLowerCase()} yet. Add one, or import the existing curriculum above.
                </div>
              ) : (
                <div className="divide-y divide-zinc-50">
                  {resourcesOfKind.map((r) => (
                    <div key={r.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-zinc-50/60 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-zinc-900 text-sm">{r.title}</span>
                          {r.topic && (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              {r.topic}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5 truncate max-w-md">{r.description}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <a
                          href={r.driveUrl} target="_blank" rel="noopener noreferrer"
                          className="p-1.5 text-zinc-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Open in Drive"
                        >
                          <Link2 className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => editResource(r)}
                          className="p-1.5 text-zinc-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Edit resource"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setResourceToDelete(r.id)}
                          className="p-1.5 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete resource"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* ════════════ STUDENT QUERIES TAB ══════════════════════════════════ */}
      {activeTab === 'queries' && (
        <Card className="border-zinc-200/70 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-zinc-100">
            <h2 className="text-sm font-bold text-zinc-900">
              Student Queries
              <span className="ml-2 text-xs font-normal text-zinc-400">({filteredDoubts.length})</span>
            </h2>
            <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
              {DOUBT_STATUS_FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setDoubtStatusFilter(key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    doubtStatusFilter === key ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {filteredDoubts.length === 0 ? (
            <div className="py-16 text-center text-zinc-400 text-sm">No queries in this filter.</div>
          ) : (
            <div className="divide-y divide-zinc-50">
              {filteredDoubts.map((d) => (
                <div key={d.id} className="px-5 py-4 hover:bg-zinc-50/60 transition-colors">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-zinc-900 text-sm">{d.topic}</span>
                        <DoubtStatusBadge status={d.status} studentConfirmed={d.studentConfirmed} />
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{d.description}</p>
                      <div className="flex items-center gap-4 mt-2 flex-wrap text-[11px] text-zinc-400">
                        <span className="font-medium text-zinc-600">{d.studentName} · {d.studentEmail}</span>
                        {d.preferredTime && (
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {d.preferredTime}</span>
                        )}
                        {d.contactNumber && (
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {d.contactNumber}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {d.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => acceptDoubt(d)}
                          disabled={doubtActionLoading}
                          className="h-8 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3"
                        >
                          Accept
                        </Button>
                      )}
                      {d.status === 'in_progress' && (
                        <Button
                          size="sm"
                          onClick={() => resolveDoubt(d)}
                          disabled={doubtActionLoading}
                          className="h-8 text-xs rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white px-3"
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* ════════════ CONFIRMATION DIALOGS ════════════════════════════════ */}
      {/* Delete Student */}
      <AlertDialog open={!!studentToDelete} onOpenChange={() => setStudentToDelete(null)}>
        <AlertDialogContent className="rounded-2xl border-none shadow-2xl max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-zinc-900">
              Delete Student Record?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 text-sm">
              This will permanently erase all course progress and payment history. You must also
              remove them from the <strong>Firebase Auth Console</strong> to fully terminate.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg text-xs h-8 px-3">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteStudent}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs h-8 px-4"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Course */}
      <AlertDialog open={!!courseToDelete} onOpenChange={() => setCourseToDelete(null)}>
        <AlertDialogContent className="rounded-2xl border-none shadow-2xl max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-zinc-900">
              Delete Course?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 text-sm">
              Removes the program from the directory. Enrolled students will not be affected, but
              new enrollments will be blocked.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg text-xs h-8 px-3">Keep</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteCourse}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs h-8 px-4"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Resource */}
      <AlertDialog open={!!resourceToDelete} onOpenChange={() => setResourceToDelete(null)}>
        <AlertDialogContent className="rounded-2xl border-none shadow-2xl max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-zinc-900">
              Delete Resource?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 text-sm">
              This removes it from the student-facing Resources page immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg text-xs h-8 px-3">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteResource}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs h-8 px-4"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Force Logout */}
      <AlertDialog open={!!studentToLogout} onOpenChange={() => setStudentToLogout(null)}>
        <AlertDialogContent className="rounded-2xl border-none shadow-2xl max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-zinc-900">
              Force Logout User?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 text-sm">
              The student will be immediately disconnected from their active session and must log in
              again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg text-xs h-8 px-3">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmForceLogout}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs h-8 px-4"
            >
              Force Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
