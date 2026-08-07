# Prompts Used During Sprint 14

## 1. Authentication Architecture Prompt
"Design a robust Next.js App Router authentication architecture for Sprint 14 of TaskMatrix using Firebase and Zustand. Emphasize tracking session state while avoiding storing passwords in global state."

## 2. Firebase Integration Prompt
"Create Next.js utility clients for Firebase auth and write an AuthProvider to handle token refresh and sync state with cookies to protect routes."

## 3. Route Protection Prompt
"Write a Next.js `middleware.ts` to protect the `/dashboard` route. It should redirect unauthenticated users to `/login` and redirect authenticated users trying to access `/login` or `/register` to the `/dashboard`."

## 4. Zustand State Management Prompt
"Implement an `authStore` in Zustand to store the current `session`, `user` object, `isAuthenticated`, and `isLoading` boolean. Include actions like `setUser`, `setAuth`, and `clearAuth` to interact seamlessly with Firebase's `onAuthStateChanged`."

## 5. UI/UX Implementation Prompt
"Build the `/login`, `/register`, and `/dashboard` pages with a dark SaaS aesthetic. Use `react-hook-form` and `zod` for robust client-side validation on forms. Include loading states, clear error messages, and eye toggles for passwords."

## 6. Debugging Prompts
"Fix the missing `AuthProvider` in `layout.tsx` so the Zustand store syncs immediately with the active Firebase session."

## 7. Deployment Prompts
"Document Vercel deployment steps in the README, emphasizing the configuration of Firebase environment variables without exposing any keys in source control."
