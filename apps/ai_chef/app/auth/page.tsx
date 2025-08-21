'use client'
import { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f5f3] px-6 py-12 relative overflow-hidden font-sans">
      {/* Background pattern or image if needed */}
      <div className="absolute inset-0 bg-[url('/marble-bg.jpg')] bg-paper opacity-20 -z-10"></div>

      <div className="bg-white rounded-3xl shadow-xl max-w-4xl w-full flex overflow-hidden max-md:flex-col">
        {/* Left side - form */}
        <div className="w-1/2 p-12 flex flex-col justify-center max-md:w-full max-md:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form className="flex flex-col gap-5">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 rounded-lg border border-gray-300 focus:outline-orange-400"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              className="p-3 rounded-lg border border-gray-300 focus:outline-orange-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded-lg border border-gray-300 focus:outline-orange-400"
              required
            />
            <button
              type="submit"
              className="bg-[#ff7a27] hover:bg-[#ff974f] text-white font-semibold py-3 rounded-xl shadow transition"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#ff7a27] font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Right side - decorative image and text */}
        <div className="w-1/2 relative bg-gradient-to-tr from-orange-400 via-orange-300 to-orange-500 max-md:h-56 max-md:w-full max-md:rounded-b-3xl max-md:flex max-md:items-center max-md:justify-center">
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 max-md:static max-md:p-6 max-md:h-full">
            <h3 className="text-2xl font-bold mb-4 max-md:text-center">
              {isLogin ? "Welcome Back!" : "New here?"}
            </h3>
            <p className="text-center max-md:text-sm">
              {isLogin
                ? "Sign in to your account to enjoy all features."
                : "Sign up and discover a great variety of delicious recipes."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
