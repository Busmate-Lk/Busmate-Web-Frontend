"use client";

import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // User is already logged in, redirect to appropriate dashboard
      const getRedirectPath = (userRole: string) => {
        switch (userRole?.toLowerCase()) {
          case 'mot':
            return '/mot/dashboard';
          case 'fleetoperator':
          case 'operator':
            return '/operator/dashboard';
          case 'timekeeper':
            return '/timeKeeper/dashboard';
          case 'admin':
          case 'systemadmin':
          case 'system-admin':
            return '/admin';
          default:
            return '/operator/dashboard';
        }
      };
      router.push(getRedirectPath(user.user_role));
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-end p-4 relative overflow-hidden">
      {/* Background image with low transparency */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95 "
          style={{
            backgroundImage: 'url(/bg.png)'
          }}
        ></div>
        
        {/* Enhanced overlay for better contrast on the right side */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/70"></div>
      </div>

      {/* Login Form - positioned on the right with enhanced visibility */}
      <div className="relative z-10 p-8 w-full max-w-md mr-8 lg:mr-16 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-2">
            <Image
              src="/Busmate Lk.svg"
              alt="Busmate LK"
              width={32}
              height={32}
              className="w-35 h-20 text-white"
            />
        </div>

        {/* Welcome text */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-white mb-2 drop-shadow-2xl">Welcome to the Smart Bus Transport Management System </h2>
          <p className="text-white/90 text-sm drop-shadow-lg">Sign in to the System Management Portal</p>
        </div>

        {/* Login Form */}
        <LoginForm />

      </div>
    </div>
  );
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn(email, password);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/40 text-white px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2 drop-shadow-lg">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@operator.lk"
          className="w-full px-4 py-3 border border-white/40 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 shadow-lg"
          required
          disabled={isLoading}
        />
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white mb-2 drop-shadow-lg">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-white/40 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200 pr-12 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 shadow-lg"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-white/40 rounded focus:ring-blue-400 focus:ring-2 bg-white/20"
            disabled={isLoading}
          />
          <label htmlFor="remember" className="ml-2 text-sm text-white drop-shadow-lg">
            Remember Me
          </label>
        </div>
        <a href="#" className="text-sm text-white hover:text-blue-300 transition-colors underline drop-shadow-lg">
          Forgot password?
        </a>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] border border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
        {!isLoading && (
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
    </form>
  );
}
