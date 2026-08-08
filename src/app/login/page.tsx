'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { auth } from '@/lib/firebase/client'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Loader2, ArrowRight, CheckCircle2, LayoutDashboard, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { logger } from '@/lib/logger'

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { setAuth } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      logger.info('Attempting user login', { email: data.email })
      if (!auth) throw new Error('Firebase Auth is not initialized. Check your environment variables.');
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      if (userCredential.user) {
        logger.info('User login successful', { uid: userCredential.user.uid })
        setAuth(userCredential.user)
        router.push('/dashboard')
      }
    } catch (err: unknown) {
      const e = err as Error
      logger.error('User login failed', { error: e.message, email: data.email })
      toast.error(e.message || 'An unexpected error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex relative overflow-hidden">
      {/* Background Orbs (Global) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[128px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[128px] animate-pulse delay-1000 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] pointer-events-none" />

      {/* Left Column: Project Info (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10 border-r border-white/5 bg-black/20 backdrop-blur-3xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">TaskMatrix</h1>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Manage work <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              seamlessly.
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            The all-in-one workspace for modern teams. Streamline your projects, track tasks, and collaborate in real-time.
          </p>

          <div className="space-y-4">
            {[
              { icon: CheckCircle2, text: 'Intuitive Kanban boards and task tracking' },
              { icon: Users, text: 'Real-time team collaboration and updates' },
              { icon: Zap, text: 'Lightning fast performance and dark mode' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                className="flex items-center gap-3 text-gray-300"
              >
                <feature.icon className="w-5 h-5 text-purple-400" />
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm text-gray-500"
        >
          &copy; {new Date().getFullYear()} TaskMatrix. All rights reserved.
        </motion.div>
      </div>

      {/* Right Column: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            {/* Mobile Logo (Visible only on small screens) */}
            <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">TaskMatrix</h1>
            </div>

            <h2 className="text-3xl font-extrabold text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                Create one now
              </Link>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="bg-white/[0.03] backdrop-blur-xl py-8 px-6 sm:px-10 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email address
                  </label>
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`block w-full px-4 py-3 bg-white/5 border ${
                        errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-purple-500/50'
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:bg-white/10 transition-all duration-300`}
                      placeholder="you@example.com"
                    />
                    <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${errors.email ? 'opacity-100 ring-1 ring-red-500/50' : 'opacity-0 group-focus-within:opacity-100 ring-1 ring-purple-500/50'}`} />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-xs text-red-400" role="alert">{errors.email.message}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      {...register('password')}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      className={`block w-full px-4 py-3 bg-white/5 border ${
                        errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-purple-500/50'
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:bg-white/10 transition-all duration-300 pr-12`}
                      placeholder="••••••••"
                    />
                    <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${errors.password ? 'opacity-100 ring-1 ring-red-500/50' : 'opacity-0 group-focus-within:opacity-100 ring-1 ring-purple-500/50'}`} />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200 transition-colors focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {errors.password && (
                      <p id="password-error" className="mt-2 text-xs text-red-400" role="alert">{errors.password.message}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050505] focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
