"use client";

import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-end p-4 relative overflow-hidden">
      {/* Background image with low transparency */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65 "
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

        {/* Footer Links
        <div className="mt-8 text-center">
          <p className="text-sm text-white/90 drop-shadow-lg">
            Don't have an account?{" "}
            <a href="#" className="text-white hover:text-blue-300 font-medium transition-colors underline">
              Sign Up
            </a>
          </p>
        </div> */}

        {/* Features Section */}
        {/* <div className="mt-8 border-t border-white/30 pt-6">
          <div className="flex items-center justify-center space-x-6 text-xs text-white/90">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 shadow-sm"></div>
              Route Management
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 shadow-sm"></div>
              Schedule Tracking
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 shadow-sm"></div>
              Analytics
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const response = await fetch("http://192.168.64.101:8080/api/auth/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password})
      });
      const data = await response.json();

      // console.log("modaya1111111")
      if(response.ok){
        // console.log("modaya");
        console.log(data.user.app_role);

        // const role = data.user.app_role?.toLowerCase();
        
        // Navigate to appropriate dashboard based on user role
        if (data.user.app_role) {
          switch(data.user.app_role) {
            case 'Mot':
              router.push('/mot/dashboard');
              break;
            case 'operator':
              router.push('/operator/dashboard');
              break;
            case 'timekeeper':
              router.push('/timeKeeper/dashboard');
              break;
            default:
              // Default to operator dashboard if role is unclear
              router.push('/operator/dashboard');
          }
        } else {
          // If no role specified, default to operator dashboard
          // router.push('/login');
          // console.log(data)
        }
      } else {
        // Handle login error
        console.error('Login failed:', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
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
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] border border-blue-500"
      >
        Sign In
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
