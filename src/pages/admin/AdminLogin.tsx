import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-orange mx-auto flex items-center justify-center text-white font-black text-2xl mb-4">M</div>
          <h1 className="text-white font-black text-2xl">Admin Panel</h1>
          <p className="text-white/50 text-sm mt-1">Maruti Engineering & Services</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white rounded-xl p-6 space-y-4 shadow-xl">
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/40"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange/40"
            />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-orange hover:bg-orange-dark disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
