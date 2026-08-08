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

---

# Prompts Used During Sprint 15

## 1. Firebase Initialization & Rules
"Update the Firebase configuration in `client.ts` to export the `db` instance from `firebase/firestore`. Create a `firestore.rules` file that strictly enforces user ownership: reads, updates, and deletes should only be permitted if `request.auth.uid == resource.data.userId`, and creates only if `request.resource.data.userId == request.auth.uid`."

## 2. Zustand Task Store Migration
"Rewrite `taskStore.ts` to replace all `json-server` REST calls with Firebase Firestore SDK operations (`getDocs`, `addDoc`, `updateDoc`, `deleteDoc`). Ensure optimistic UI updates are maintained and errors are re-thrown for the UI components to catch. Add `userId: string` to the `Task` type in `types/index.ts`."

## 3. UI/UX Polishing for CRUD
"Enhance `TaskModal.tsx` and `KanbanBoard.tsx` to handle loading states during Firestore saves. Implement an inline delete confirmation dialog before deleting tasks. Integrate `react-hot-toast` for success and failure notifications."

## 4. Dashboard Analytics & Data Viz
"Implement dynamic data visualization in the dashboard using `recharts`. Build a `TaskCharts.tsx` component that queries `useTaskStore` to display a BarChart for task statuses and a PieChart for task priorities. Add empty states when no data exists."
