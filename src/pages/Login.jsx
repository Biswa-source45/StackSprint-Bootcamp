import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  Home
} from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! Redirecting to your dashboard...');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Authentication Failed', {
        description: err.message,
        duration: 8000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-zinc-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-[-8%] right-[-8%] w-[350px] h-[350px] bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-8%] left-[-8%] w-[350px] h-[350px] bg-orange-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[400px] relative z-10">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-emerald-600 transition-colors mb-6 group"
        >
          <Home className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Landing Page
        </Link>

        <Card className="p-7 border border-zinc-200/80 shadow-2xl shadow-emerald-900/8 rounded-2xl bg-white/90 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center space-y-2 mb-7">
            <div className="inline-flex p-2.5 bg-emerald-50 rounded-xl mb-1">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-xl font-extrabold text-zinc-900 tracking-tight">Access Portal</h1>
            <p className="text-zinc-400 text-xs font-medium">Secure login for Students &amp; Staff</p>
          </div>

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
              <button type="button" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                Forgot code?
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
        </Card>
      </div>
    </div>
  );
}
