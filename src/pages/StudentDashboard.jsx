import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
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
  IndianRupee
} from 'lucide-react';
import { toast } from 'sonner';

export default function StudentDashboard() {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

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
    </div>
  );
}
