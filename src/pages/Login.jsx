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
import AetheraNavbar from '../components/layout/AetheraNavbar';
import { Footer } from '../components/layout/Footer';

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
              </div>
            </div>

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
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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

    </div>
  );
}
