import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { signIn, resetPassword } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';

const Login = ({ children }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { user, error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({
          title: 'Login Failed',
          description: error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address first.',
        variant: 'destructive',
      });
      return;
    }
    const { success, error } = await resetPassword(formData.email);
    if (success) {
      toast({
        title: 'Reset Email Sent',
        description: 'Check your email for password reset instructions.'
      });
    } else {
      toast({
        title: 'Reset Failed',
        description: error,
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] p-4">
      <div className="w-full max-w-md">
        <div className="bg-[hsl(var(--card))]/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-[hsl(var(--border))]/40 p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--caterpillar-yellow))/20] rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[hsl(var(--caterpillar-yellow))/10] rounded-full translate-y-12 -translate-x-12"></div>
          <div className="text-center space-y-3 relative z-10">
            <div className="w-16 h-16 bg-[hsl(var(--caterpillar-yellow))] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-[hsl(var(--black))]" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--caterpillar-yellow))] to-[hsl(var(--black))] bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="text-[hsl(var(--foreground))/70]">
              Sign in to your account to continue
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[hsl(var(--caterpillar-yellow))] w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl bg-[hsl(var(--background))/60] focus:bg-[hsl(var(--background))] focus:ring-4 focus:ring-[hsl(var(--caterpillar-yellow))/30] focus:border-[hsl(var(--caterpillar-yellow))] transition-all duration-300 placeholder-[hsl(var(--foreground)/.4)] ${
                    errors.email ? 'border-rose-300 bg-rose-50/50' : 'border-[hsl(var(--caterpillar-yellow))]'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-rose-500 text-sm flex items-center gap-1">
                <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                {errors.email}
              </p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[hsl(var(--caterpillar-yellow))] w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-14 py-4 border-2 rounded-2xl bg-[hsl(var(--background))/60] focus:bg-[hsl(var(--background))] focus:ring-4 focus:ring-[hsl(var(--caterpillar-yellow))/30] focus:border-[hsl(var(--caterpillar-yellow))] transition-all duration-300 placeholder-[hsl(var(--foreground)/.4)] ${
                    errors.password ? 'border-rose-300 bg-rose-50/50' : 'border-[hsl(var(--caterpillar-yellow))]'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[hsl(var(--caterpillar-yellow))] hover:text-[hsl(var(--black))] transition-colors p-1 rounded-lg hover:bg-[hsl(var(--caterpillar-yellow))/20]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-rose-500 text-sm flex items-center gap-1">
                <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                {errors.password}
              </p>}
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[hsl(var(--caterpillar-yellow))] hover:text-[hsl(var(--black))] transition-colors font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[hsl(var(--caterpillar-yellow))] hover:bg-[hsl(var(--black))] text-[hsl(var(--black))] hover:text-[hsl(var(--caterpillar-yellow))] py-4 px-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-[hsl(var(--caterpillar-yellow))/30] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span className="text-lg">{loading ? 'Please wait...' : 'Sign In'}</span>
            </button>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
