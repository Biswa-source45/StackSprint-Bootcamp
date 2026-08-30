import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFriendlyAuthError } from '../lib/authErrors';
import { requestOtp, confirmPasswordReset } from '../lib/passwordReset';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
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
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  Home,
  MonitorSmartphone,
  KeyRound,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import AetheraNavbar from '../components/layout/AetheraNavbar';
import { Footer } from '../components/layout/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conflictDevice, setConflictDevice] = useState(null); // deviceInfo of the other active session
  const [takingOver, setTakingOver] = useState(false);
  const { login, forceLogin } = useAuth();
  const navigate = useNavigate();

  // ── Forgot password ──────────────────────────────────────────────────────
  const [authView, setAuthView] = useState('login'); // 'login' | 'forgot-request' | 'forgot-verify'
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const openForgotPassword = () => {
    setResetEmail(email);
    setAuthView('forgot-request');
  };

  const backToLogin = () => {
    setAuthView('login');
    setOtp('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    const { ok, error, message } = await requestOtp(resetEmail);
    setResetLoading(false);
    if (!ok) {
      toast.error('Could not send code', { description: error });
      return;
    }
    toast.success(message || 'Reset code sent — check your inbox.');
    setAuthView('forgot-verify');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }
    setResetLoading(true);
    const { ok, error } = await confirmPasswordReset(resetEmail, otp, newPassword);
    setResetLoading(false);
    if (!ok) {
      toast.error('Could not reset password', { description: error });
      return;
    }
    toast.success('Password updated! Sign in with your new password.');
    setEmail(resetEmail);
    setPassword('');
    backToLogin();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! Redirecting to your dashboard...');
      navigate('/dashboard');
    } catch (err) {
      if (err.code === 'DEVICE_CONFLICT') {
        setConflictDevice(err.deviceInfo || {});
      } else {
        toast.error('Authentication Failed', {
          description: getFriendlyAuthError(err),
          duration: 8000
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForceLogin = async () => {
    setTakingOver(true);
    try {
      await forceLogin(email, password);
      toast.success('Other device logged out. Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Could not log in', { description: getFriendlyAuthError(err) });
    } finally {
      setTakingOver(false);
      setConflictDevice(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-inter flex flex-col justify-between relative overflow-hidden">
      {/* Header Navigation */}
      <AetheraNavbar />

      <div className="w-full max-w-[460px] mx-auto px-4 py-12 relative z-10 flex-grow flex flex-col justify-center bg-white">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-black/60 hover:text-black transition-colors mb-6 group self-start"
        >
          <Home className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Landing Page
        </Link>

<<<<<<< HEAD
        <Card className="p-8 md:p-10  rounded-3xl bg-white">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex p-3 bg-black/5 rounded-2xl mb-2 text-black border border-black/10">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-3xl font-normal font-instrument text-black tracking-tight">Access Portal</h1>
            <p className="text-black/60 text-xs font-medium">Secure login for Students &amp; Staff</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-black/70">Email Address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40">
                  <Mail className="w-4 h-4" />
                </div>
                <Input
                  type="email"
                  required
                  className="pl-10 h-11 text-sm rounded-xl border-black/15 focus:border-black focus:ring-black/10 text-black font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yours@example.com"
                />
=======
        <Card className="p-7 border border-zinc-200/80 shadow-2xl shadow-emerald-900/8 rounded-2xl bg-white/90 backdrop-blur-xl">
          {authView === 'login' && (
            <>
              {/* Header */}
              <div className="text-center space-y-2 mb-7">
                <div className="inline-flex p-2.5 bg-emerald-50 rounded-xl mb-1">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <h1 className="text-xl font-extrabold text-zinc-900 tracking-tight">Access Portal</h1>
                <p className="text-zinc-400 text-xs font-medium">Secure login for Students &amp; Staff</p>
>>>>>>> b4459f70674bff8c080ba4705a09a10107526309
              </div>

<<<<<<< HEAD
            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-black/70">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40">
                  <Lock className="w-4 h-4" />
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="pl-10 pr-10 h-11 text-sm rounded-xl border-black/15 focus:border-black focus:ring-black/10 text-black font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-black/40 hover:text-black transition-colors"
=======
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-600">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <Input
                      type="email"
                      required
                      className="pl-9 h-10 text-sm rounded-lg border-zinc-200 focus:border-emerald-400 focus:ring-emerald-400/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yours@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-600">Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="pl-9 pr-10 h-10 text-sm rounded-lg border-zinc-200 focus:border-emerald-400 focus:ring-emerald-400/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-emerald-500 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember me / Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-zinc-500">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={openForgotPassword}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm shadow-lg shadow-emerald-700/20 group mt-1"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto text-emerald-200" />
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign Into Portal
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>

              {/* Footer trust badges */}
              <div className="mt-6 pt-5 border-t border-zinc-100 grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-zinc-50 rounded-xl space-y-0.5">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" /> Encrypted
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-relaxed">End-to-end data security.</p>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-xl space-y-0.5">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <ShieldCheck className="w-3 h-3" /> Monitored
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-relaxed">Session activity logged.</p>
                </div>
              </div>
            </>
          )}

          {authView === 'forgot-request' && (
            <>
              <button
                type="button"
                onClick={backToLogin}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-emerald-600 transition-colors mb-5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to login
              </button>

              <div className="text-center space-y-2 mb-7">
                <div className="inline-flex p-2.5 bg-emerald-50 rounded-xl mb-1">
                  <KeyRound className="w-6 h-6 text-emerald-600" />
                </div>
                <h1 className="text-xl font-extrabold text-zinc-900 tracking-tight">Reset Password</h1>
                <p className="text-zinc-400 text-xs font-medium">
                  Enter your account email — we'll send a 6-digit code.
                </p>
              </div>

              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-600">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <Input
                      type="email"
                      required
                      className="pl-9 h-10 text-sm rounded-lg border-zinc-200 focus:border-emerald-400 focus:ring-emerald-400/20"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="yours@example.com"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={resetLoading}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm shadow-lg shadow-emerald-700/20 mt-1"
                >
                  {resetLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto text-emerald-200" /> : 'Send Reset Code'}
                </Button>
              </form>
            </>
          )}

          {authView === 'forgot-verify' && (
            <>
              <button
                type="button"
                onClick={backToLogin}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-emerald-600 transition-colors mb-5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to login
              </button>

              <div className="text-center space-y-2 mb-7">
                <div className="inline-flex p-2.5 bg-emerald-50 rounded-xl mb-1">
                  <KeyRound className="w-6 h-6 text-emerald-600" />
                </div>
                <h1 className="text-xl font-extrabold text-zinc-900 tracking-tight">Enter Code</h1>
                <p className="text-zinc-400 text-xs font-medium">
                  We sent a code to <span className="font-semibold text-zinc-600">{resetEmail}</span>
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-600">6-Digit Code</Label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    className="h-10 text-sm rounded-lg border-zinc-200 focus:border-emerald-400 focus:ring-emerald-400/20 tracking-[0.3em] text-center font-mono"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-600">New Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      className="pl-9 pr-10 h-10 text-sm rounded-lg border-zinc-200 focus:border-emerald-400 focus:ring-emerald-400/20"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-emerald-500 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-zinc-600">Confirm New Password</Label>
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    className="h-10 text-sm rounded-lg border-zinc-200 focus:border-emerald-400 focus:ring-emerald-400/20"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Re-enter new password"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={resetLoading || otp.length !== 6}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm shadow-lg shadow-emerald-700/20 mt-1"
                >
                  {resetLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto text-emerald-200" /> : 'Reset Password'}
                </Button>

                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={resetLoading}
                  className="w-full text-center text-xs font-semibold text-emerald-600 hover:text-emerald-700"
>>>>>>> b4459f70674bff8c080ba4705a09a10107526309
                >
                  Resend code
                </button>
<<<<<<< HEAD
              </div>
            </div>

            {/* Remember me / Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-black/20 text-black focus:ring-black"
                />
                <span className="text-xs text-black/60 font-medium">Remember me</span>
              </label>
              <button type="button" className="text-xs font-semibold text-black hover:underline">
                Forgot code?
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-black hover:bg-zinc-900 text-white rounded-full font-medium text-base shadow-md group mt-2 hover:scale-[1.02] transition-all duration-300"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto text-white" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign Into Portal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer trust badges */}
          <div className="mt-8 pt-6 border-t border-black/10 grid grid-cols-2 gap-3">
            <div className="p-3 bg-black/[0.02] border border-black/5 rounded-2xl space-y-0.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-black">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" /> Encrypted
              </div>
              <p className="text-[10px] text-black/60 leading-relaxed font-medium">End-to-end data security.</p>
            </div>
            <div className="p-3 bg-black/[0.02] border border-black/5 rounded-2xl space-y-0.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-black">
                <ShieldCheck className="w-3.5 h-3.5 text-black" /> Monitored
              </div>
              <p className="text-[10px] text-black/60 leading-relaxed font-medium">Session activity logged.</p>
            </div>
          </div>
        </Card>
      </div>

=======
              </form>
            </>
          )}
        </Card>
      </div>

      {/* Device conflict — self-service takeover */}
      <AlertDialog open={!!conflictDevice} onOpenChange={(open) => !open && setConflictDevice(null)}>
        <AlertDialogContent className="rounded-2xl border-none shadow-2xl max-w-sm">
          <AlertDialogHeader>
            <div className="inline-flex p-2.5 bg-orange-50 rounded-xl mb-1 mx-auto sm:mx-0">
              <MonitorSmartphone className="w-5 h-5 text-orange-600" />
            </div>
            <AlertDialogTitle className="text-base font-bold text-zinc-900">
              Already Logged In Elsewhere
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-500 text-sm">
              Your account is currently active on{' '}
              <strong>{conflictDevice?.ua ? conflictDevice.ua.slice(0, 70) : 'another device'}</strong>
              {conflictDevice?.timestamp && (
                <> since {new Date(conflictDevice.timestamp).toLocaleString('en-IN')}</>
              )}
              . This portal only allows one active session at a time. You can log that device out and
              continue signing in here.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg text-xs h-8 px-3" disabled={takingOver}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleForceLogin}
              disabled={takingOver}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs h-8 px-4"
            >
              {takingOver ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                'Log Out That Device & Sign In Here'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
>>>>>>> b4459f70674bff8c080ba4705a09a10107526309
    </div>
  );
}
