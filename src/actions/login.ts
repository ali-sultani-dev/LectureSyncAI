// src/action/login.ts
'use server' // IMPORTANT: Add this directive at the top

// Import necessary libraries (e.g., database client, hashing library, session management)
// import { db } from '@/lib/db';
// import bcrypt from 'bcrypt';
// import { createSession } from '@/lib/session';
// import { redirect } from 'next/navigation'; // Optional: redirect server-side

// Define the structure of the data expected by this action
interface LoginCredentials {
  email: string
  password: string
}

// Define the structure of the return value (useful for error handling)
interface ActionResult {
  error?: string
  success?: boolean
  // Add other relevant data if needed
}

export async function login(credentials: LoginCredentials): Promise<ActionResult> {
  console.log('Server Action: login called with', credentials.email) // Server-side log

  try {
    // --- Your Actual Login Logic Goes Here ---
    // 1. Validate input (basic example)
    if (!credentials.email || !credentials.password) {
      return { error: 'Email and password are required.' }
    }

    // 2. Find user in database
    // const user = await db.user.findUnique({ where: { email: credentials.email } });
    // if (!user) {
    //   return { error: 'Invalid credentials.' }; // Avoid saying "user not found"
    // }

    // 3. Compare hashed password
    // const passwordMatch = await bcrypt.compare(credentials.password, user.passwordHash);
    // if (!passwordMatch) {
    //   return { error: 'Invalid credentials.' };
    // }

    // 4. Create a session / set a cookie
    // await createSession(user.id);
    // console.log('Login successful for:', user.email);

    // --- End of Your Logic ---

    // Simulate success for demonstration:
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      console.log('Simulated login successful')
      // If login is successful, you might redirect server-side (optional)
      // redirect('/dashboard');
      // OR return success to let the client redirect
      return { success: true }
    } else {
      console.log('Simulated login failed')
      return { error: 'Invalid email or password' }
    }
  } catch (error) {
    console.error('Login Action Error:', error)
    // Return a generic error message to the client
    return { error: 'An unexpected error occurred during login.' }
  }
}
