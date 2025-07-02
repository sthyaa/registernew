import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';
import { signUp } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';

const Register = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
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
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { user, error } = await signUp(formData.email, formData.password, formData.name);
      if (error) {
        toast({
          title: 'Registration Failed',
          description: error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Account Created!',
          description: 'Your account has been created successfully.'
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
              <User className="w-8 h-8 text-[hsl(var(--black))]" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--caterpillar-yellow))] to-[hsl(var(--black))] bg-clip-text text-transparent">
              Join us today
            </h1>
            <p className="text-[hsl(var(--foreground))/70]">
              Create your account and start your journey
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[hsl(var(--caterpillar-yellow))] w-5 h-5" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl bg-[hsl(var(--background))/60] focus:bg-[hsl(var(--background))] focus:ring-4 focus:ring-[hsl(var(--caterpillar-yellow))/30] focus:border-[hsl(var(--caterpillar-yellow))] transition-all duration-300 placeholder-[hsl(var(--foreground)/.4)] ${
                    errors.name ? 'border-rose-300 bg-rose-50/50' : 'border-[hsl(var(--caterpillar-yellow))]'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="text-rose-500 text-sm flex items-center gap-1">
                <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                {errors.name}
              </p>}
            </div>
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
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[hsl(var(--caterpillar-yellow))] w-5 h-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-14 py-4 border-2 rounded-2xl bg-[hsl(var(--background))/60] focus:bg-[hsl(var(--background))] focus:ring-4 focus:ring-[hsl(var(--caterpillar-yellow))/30] focus:border-[hsl(var(--caterpillar-yellow))] transition-all duration-300 placeholder-[hsl(var(--foreground)/.4)] ${
                    errors.confirmPassword ? 'border-rose-300 bg-rose-50/50' : 'border-[hsl(var(--caterpillar-yellow))]'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[hsl(var(--caterpillar-yellow))] hover:text-[hsl(var(--black))] transition-colors p-1 rounded-lg hover:bg-[hsl(var(--caterpillar-yellow))/20]"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-rose-500 text-sm flex items-center gap-1">
                <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                {errors.confirmPassword}
              </p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[hsl(var(--caterpillar-yellow))] hover:bg-[hsl(var(--black))] text-[hsl(var(--black))] hover:text-[hsl(var(--caterpillar-yellow))] py-4 px-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-[hsl(var(--caterpillar-yellow))/30] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span className="text-lg">{loading ? 'Please wait...' : 'Create Account'}</span>
            </button>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
