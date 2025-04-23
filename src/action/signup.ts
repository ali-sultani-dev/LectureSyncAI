// src/action/signup.ts
'use server' // IMPORTANT: Add this directive at the top

// Import necessary libraries
// import { db } from '@/lib/db';
// import bcrypt from 'bcrypt';
// import { createSession } from '@/lib/session';
// import { redirect } from 'next/navigation';

interface SignupData {
  name: string
  email: string
  password: string
}

interface ActionResult {
  error?: string
  success?: boolean
}

export async function signup(data: SignupData): Promise<ActionResult> {
  console.log('Server Action: signup called for', data.email)

  try {
    // --- Your Actual Signup Logic Goes Here ---
    // 1. Validate input
    if (!data.name || !data.email || !data.password) {
      return { error: 'Name, email, and password are required.' }
    }
    // Add more robust validation (email format, password strength)

    // 2. Check if user already exists
    // const existingUser = await db.user.findUnique({ where: { email: data.email } });
    // if (existingUser) {
    //   return { error: 'Email already in use.' };
    // }

    // 3. Hash password
    // const hashedPassword = await bcrypt.hash(data.password, 10); // Salt rounds = 10

    // 4. Create user in database
    // const newUser = await db.user.create({
    //   data: {
    //     name: data.name,
    //     email: data.email,
    //     passwordHash: hashedPassword,
    //   },
    // });
    // console.log('User created:', newUser.email);

    // 5. Optionally: Log the user in immediately by creating a session
    // await createSession(newUser.id);

    // --- End of Your Logic ---

    // Simulate success for demonstration:
    console.log('Simulated signup successful for:', data.email)
    // If signup is successful, you might redirect server-side (optional)
    // redirect('/dashboard');
    // OR return success to let the client redirect
    return { success: true }
  } catch (error) {
    console.error('Signup Action Error:', error)
    return { error: 'An unexpected error occurred during signup.' }
  }
}
