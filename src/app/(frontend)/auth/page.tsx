// src/app/(frontend)/auth/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// No need for Link if you only use the button to toggle

// --- IMPORT YOUR SERVER ACTIONS ---
// Adjust the path based on your actual folder structure.
// Using '@/action/...' assumes you have path aliases configured in tsconfig.json.
// If not, use relative paths like '../../action/login'.
import { login } from 'src/actions/login' // Or '../../action/login'
import { signup } from 'src/actions/signup' // Or '../../action/signup'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let result // To store the result from the server action

      if (isLogin) {
        // --- CALL THE LOGIN SERVER ACTION ---
        result = await login({ email, password })
      } else {
        // --- CALL THE SIGNUP SERVER ACTION ---
        result = await signup({ email, password, name })
      }

      // --- CHECK THE RESULT FROM THE SERVER ACTION ---
      if (result?.error) {
        // If the action returned an error object, display it
        throw new Error(result.error)
      }

      // If the action was successful (didn't throw and didn't return an error)
      // You might get other data back from the action if needed
      console.log('Authentication successful')
      router.push('/dashboard/notes/id') // Redirect on success
    } catch (err) {
      // Catch errors thrown either by the action itself or network issues
      console.error('Form submission error:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  // --- Keep the rest of your JSX return statement the same ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Website Title */}
        <h1 className="text-center text-4xl font-bold text-black mt-2">LectureSync.AI</h1>

        <div className="text-center">
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin} // Only required when signing up
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${!isLogin ? '' : 'rounded-t-md'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('') // Clear error when switching modes
              // Optionally clear form fields too
              // setEmail('');
              // setPassword('');
              // setName('');
            }}
            className="font-medium text-indigo-600 hover:text-indigo-500"
            disabled={loading} // Disable toggle while submitting
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
