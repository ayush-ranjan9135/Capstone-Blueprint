# Prompts Used During Sprint 14

## 1. Authentication Architecture Prompt
"Design a robust Next.js App Router authentication architecture for Sprint 14 of TaskMatrix using Supabase and Zustand. Emphasize server-side session checks using `@supabase/ssr` while avoiding storing passwords in global state."

## 2. Supabase Integration Prompt
"Create Next.js utility clients for Supabase: a browser client for client components, a server client for Server Components, and a middleware utility to handle token refresh and protect routes."

## 3. Route Protection Prompt
"Write a Next.js `middleware.ts` to protect the `/dashboard` route. It should redirect unauthenticated users to `/login` and redirect authenticated users trying to access `/login` or `/register` to the `/dashboard`."

## 4. Zustand State Management Prompt
"Implement an `authStore` in Zustand to store the current `session`, `user` object, `isAuthenticated`, and `isLoading` boolean. Include actions like `setUser`, `setAuth`, and `clearAuth` to interact seamlessly with Supabase's `onAuthStateChange`."

## 5. UI/UX Implementation Prompt
"Build the `/login`, `/register`, and `/dashboard` pages with a dark SaaS aesthetic. Use `react-hook-form` and `zod` for robust client-side validation on forms. Include loading states, clear error messages, and eye toggles for passwords."

## 6. Debugging Prompts
"Fix the missing `AuthProvider` in `layout.tsx` so the Zustand store syncs immediately with the active Supabase session."

## 7. Deployment Prompts
"Document Vercel deployment steps in the README, emphasizing the configuration of Supabase environment variables without exposing any keys in source control."
