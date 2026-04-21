import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  ShieldAlert, 
  UserPlus, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';

import { toast } from 'sonner';

export default function RegisterAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: 'admin',
        createdAt: new Date().toISOString()
      });

      toast.success("Admin account initialized!");
      navigate('/login');
    } catch (err) {
      toast.error("Initialization Failed", {
        description: err.message
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-zinc-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-zinc-500 rounded-full blur-[100px]"></div>
      </div>

      <Card className="w-full max-w-[400px] p-6 sm:p-8 border border-white shadow-2xl relative z-10 rounded-[3rem] bg-white/90 backdrop-blur-md">
        <div className="space-y-2 mb-8 text-center">
          <div className="inline-flex p-3 bg-zinc-900 text-white rounded-2xl mb-2">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900">Admin Setup</h1>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest text-emerald-600">Secure System Initialization</p>
          <div className="mt-2 py-1 px-3 bg-red-50 rounded-full inline-block border border-red-100">
             <p className="text-[10px] font-bold text-red-600">Delete this page after creating admin</p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <div className="relative group">
              <UserPlus className="absolute left-4 top-3.5 w-4 h-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input 
                required 
                className="pl-11 h-12 rounded-2xl" 
                placeholder="e.g. Admin User" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Admin Email</Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input 
                type="email" 
                required 
                className="pl-11 h-12 rounded-2xl" 
                placeholder="admin@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Secure Password</Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
              <Input 
                type={showPassword ? "text" : "password"} 
                required 
                className="pl-11 pr-12 h-12 rounded-2xl" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-emerald-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-zinc-900 hover:bg-zinc-800 text-white h-14 rounded-2xl font-bold text-lg mt-4 shadow-xl">
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : (
              <span className="flex items-center justify-center gap-2">Initialize Admin <ArrowRight className="w-5 h-5" /></span>
            )}
          </Button>
        </form>

        <div className="mt-8 flex items-center gap-2 justify-center text-[10px] text-zinc-400 uppercase font-bold tracking-widest bg-zinc-50 border border-zinc-100 p-3 rounded-2xl">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> System Security Active
        </div>
      </Card>
    </div>
  );
}
