# Prompts.md — TaskMatrix Capstone Blueprint

> This document records all AI-assisted prompts used during the research, planning, architecture, and documentation phases of the TaskMatrix Sprint 13 Capstone. Each prompt is documented with its purpose, the context in which it was used, and a note on how the output was refined or adapted.

---

## Table of Contents

1. [Research Prompts](#1-research-prompts)
2. [Architecture Prompts](#2-architecture-prompts)
3. [UI/UX Design Prompts](#3-uiux-design-prompts)
4. [State Management Prompts](#4-state-management-prompts)
5. [API Design Prompts](#5-api-design-prompts)
6. [Component Architecture Prompts](#6-component-architecture-prompts)
7. [Documentation Prompts](#7-documentation-prompts)
8. [Refactoring Prompts](#8-refactoring-prompts)
9. [Testing Strategy Prompts](#9-testing-strategy-prompts)
10. [Deployment Prompts](#10-deployment-prompts)

---

## 1. Research Prompts

### 1.1 — Competitive Analysis

**Prompt:**
```
Compare the UX architecture of Jira, Linear, and Asana from an engineering team's perspective.
Focus on: information density, keyboard shortcuts, state management patterns visible in the UI,
and where each product makes trade-offs between power and simplicity. I'm building a project
management tool and want to understand which UX decisions to adopt and which to avoid.
```

**Why this prompt:** Before designing any UI, it's important to understand the competitive landscape beyond surface-level feature lists. This prompt was designed to extract *architectural* and *UX* insights rather than marketing differentiators. The framing around "an engineering team's perspective" focused the response on workflow efficiency, which is TaskMatrix's primary value proposition.

**How the output was used:** Linear's keyboard-first design and context-preserving modal approach influenced the CommandPalette implementation and the decision to render TaskModal at the layout level rather than inside TaskCard. Jira's complexity around issue types was deliberately avoided — TaskMatrix uses a single `Task` model.

---

### 1.2 — Next.js App Router Architecture

**Prompt:**
```
Explain the Next.js 15 App Router folder conventions for a multi-tenant SaaS application
that has both authenticated and unauthenticated routes. Show me how to use route groups
to apply different layouts to auth pages vs app pages without duplicating layout logic.
Include: how to handle loading.tsx, error.tsx, and not-found.tsx at the right scope levels.
```

**Why this prompt:** The App Router's route group feature (`(auth)` vs `(app)`) is non-obvious for developers coming from the Pages Router. This prompt was used early in the planning phase to ensure the folder architecture was idiomatic Next.js 15 before committing it to the README.

**How the output was used:** Directly influenced the `src/app/` directory structure. The route group convention eliminates the need for conditional layout logic in any page component — `AppLayout` with `AuthGuard` is applied once to all `(app)` routes rather than being imported into every protected page.

---

### 1.3 — Drag and Drop Library Evaluation

**Prompt:**
```
Evaluate these drag-and-drop libraries for a React kanban board in 2025:
react-beautiful-dnd (deprecated), @hello-pangea/dnd, dnd-kit, and react-dnd.
Compare on: maintenance status, bundle size, TypeScript support, accessibility,
touch support, and API complexity. Which would you recommend for a Next.js 15
app with ~5 columns and ~30 cards per column?
```

**Why this prompt:** The original `react-beautiful-dnd` by Atlassian is unmaintained. Picking the wrong library for kanban drag-and-drop could create significant technical debt or accessibility problems.

**How the output was used:** The evaluation confirmed `@hello-pangea/dnd` (the maintained community fork of react-beautiful-dnd) as the best fit for this use case — it has a nearly identical API, active maintenance, and strong accessibility out of the box. `dnd-kit` is more flexible but has a steeper API surface for a bounded use case like a kanban board.

---

### 1.4 — Zustand vs Other State Managers

**Prompt:**
```
I'm building a frontend-only React application with 6 domain areas: auth, tasks, projects,
notifications, theme, and UI state. Compare Zustand 5, Jotai, Redux Toolkit, and React Query
for this use case. The app has no server-side rendering requirements for data fetching —
all data comes from a REST API. What are the real trade-offs, not just the marketing pitch?
```

**Why this prompt:** State management is one of the most consequential architectural decisions for a React app. The prompt was deliberately adversarial ("not just the marketing pitch") to get honest trade-off analysis rather than documentation summaries.

**How the output was used:** Zustand's low boilerplate, direct store mutation, and `persist` middleware made it the clear winner for this application profile. The insight about using React Query alongside Zustand (React Query for server state, Zustand for client state) was noted as a future upgrade path — for this sprint, Zustand handles both with axios fetch functions living directly in store actions.

---

## 2. Architecture Prompts

### 2.1 — Folder Architecture Design

**Prompt:**
```
Design a production-grade Next.js 15 App Router folder structure for a project management
SaaS called TaskMatrix. The app has these features: authentication, dashboard, kanban board,
task management, calendar, notifications, and profile. Include src/ prefix. Organize components
by domain, not by type. Explain the reasoning behind each top-level folder decision.
No unnecessary depth — every folder should earn its existence.
```

**Why this prompt:** Many example Next.js architectures are either too flat (everything in `/components`) or too granular (nested 5 levels deep). The constraint "every folder should earn its existence" was included to prevent bloat.

**How the output was used:** The domain-organized `components/` structure (`kanban/`, `tasks/`, `dashboard/`) came directly from this prompt. The distinction between `components/ui/` (shadcn primitives, untouched) and `components/shared/` (our own reusable components) was an insight from this prompt that became a team convention.

---

### 2.2 — API Layer Abstraction

**Prompt:**
```
Design an API service layer for a React/Next.js app that uses JSON Server as a mock backend
now but will migrate to a real backend later. The layer should: use Axios with request/response
interceptors, inject auth tokens automatically, handle 401 refreshes, and expose typed service
functions (not raw Axios calls) to the rest of the app. Show me the client.ts and one example
service file (tasks.ts). TypeScript, production patterns only.
```

**Why this prompt:** The goal was to design the API layer so that migrating from JSON Server to a real backend in Sprint 17+ requires zero component changes. The interceptor pattern for token injection and 401 handling is non-trivial and worth getting right in the planning phase.

**How the output was used:** The pattern of a single `client.ts` (Axios instance with interceptors) plus domain-specific service files (`tasks.ts`, `projects.ts`) is reflected in the `src/lib/api/` folder structure. The interceptor design for auth token injection and refresh is documented in the Security section of the README.

---

### 2.3 — AuthGuard Implementation

**Prompt:**
```
How do I implement route protection in Next.js 15 App Router? I need: server-side redirect
for unauthenticated requests, and a client-side AuthGuard component for client-only auth
state (stored in Zustand/LocalStorage). The redirect should preserve the original URL
as a query param so the user lands back where they were after login. No middleware.tsx —
I want to keep this fully client-side for the MVP.
```

**Why this prompt:** The App Router changed how route protection works compared to the Pages Router. The explicit "no middleware.tsx" constraint was important — for a LocalStorage-based auth system, a server-side middleware has no access to the token anyway.

**How the output was used:** The `AuthGuard` component pattern lives in `AppLayout.tsx`. The `?redirect=/original-path` query parameter behavior is implemented in the login flow.

---

## 3. UI/UX Design Prompts

### 3.1 — Design System Specification

**Prompt:**
```
Design a complete CSS design token system for a dark-first SaaS application with an indigo
primary color. Include: type scale (rem-based), color tokens with HSL for easy manipulation,
spacing scale, border-radius scale, and box-shadow scale. The brand should feel like Linear
or Vercel — minimal, technical, and confident. No Bootstrap, no Tailwind defaults. Show me
the CSS custom properties.
```

**Why this prompt:** A design system that starts from tokens rather than component-by-component decisions stays consistent as the app grows. HSL was chosen over hex because it allows programmatic manipulation (darkening a color for hover state is a simple lightness adjustment).

**How the output was used:** The color tokens, typography scale, and spacing system in the README's UI Design System section are adapted from this prompt's output. The semantic color naming (`--color-success`, `--color-warning`, `--color-error`) rather than raw color names (`--green`, `--amber`) came from this exercise.

---

### 3.2 — Kanban Card Information Architecture

**Prompt:**
```
I'm designing a kanban task card for a project management tool. What information should
appear on the card itself vs. inside the task detail modal? Prioritize by: information
that changes how a user acts on the card immediately, vs. information that provides context
only when the user decides to engage with the task. Keep cards to a maximum of 5 data points.
Reference Linear and GitHub Issues card designs.
```

**Why this prompt:** Card information density is one of the most common UI mistakes in task management tools — too much information makes cards overwhelming; too little requires constant modal opens. This prompt was used to make a deliberate, principled decision about card content.

**How the output was used:** TaskCard shows exactly 5 data points: title, priority badge, assignee avatar, due date, and subtask progress. Labels and story points are visible on hover only. Everything else lives in the modal. This matches the behavior of Linear's issue cards.

---

### 3.3 — Mobile-First Navigation Pattern

**Prompt:**
```
I'm building a responsive project management web app. On desktop, it has a persistent
left sidebar. What's the best mobile navigation pattern for this type of app? Compare:
bottom tab bar, hamburger menu, and slide-out drawer. Consider: common actions frequency,
thumb reach zone, iOS Safari safe area, and how each pattern affects the desktop layout.
```

**Why this prompt:** Navigation pattern choice on mobile has significant implications for both UX and implementation complexity. Getting this decision right in the planning phase prevents costly restructuring later.

**How the output was used:** The bottom tab bar (`MobileNav`) was chosen for primary navigation (4 tabs: Home, Projects, Tasks, Profile). A sheet drawer handles overflow navigation items. This pattern keeps the 4 most-used destinations within thumb reach at all times, which aligns with mobile usage patterns for productivity apps.

---

### 3.4 — Empty State and Loading State Design

**Prompt:**
```
Design the content strategy for empty states and loading states in a project management app.
Specifically: what text should appear when a project has no tasks, when the task list is
loading, when a search returns no results, and when a user has no notifications?
The tone should feel human and helpful without being cutesy or condescending.
Each empty state should have: an illustration description, heading, one-sentence body, and
optional CTA. Loading states should use skeletons — tell me how to match skeleton shapes
to component layouts.
```

**Why this prompt:** Empty and loading states are often treated as afterthoughts, which results in jarring UX. Defining them in the planning phase ensures they're built as first-class UI elements, not bolted on at the end.

**How the output was used:** The `EmptyState` component contract (icon, heading, description, CTA button) came from this prompt. The skeleton guidelines shaped the `LoadingSkeleton` component variants.

---

## 4. State Management Prompts

### 4.1 — Zustand Store Design

**Prompt:**
```
Design a Zustand 5 store architecture for a project management app with these state domains:
auth, tasks, projects, notifications, theme, and UI state. For each store:
- Define the TypeScript interface
- Identify which state should be persisted to LocalStorage and which shouldn't
- Identify which stores need to read from other stores
- Explain the data flow when a user drags a task card to a new column

Use the slice pattern only if it genuinely simplifies things. Don't over-engineer.
```

**Why this prompt:** Zustand's flexibility can lead to either beautiful simple stores or a tangled mess of cross-store dependencies. The explicit constraint "don't over-engineer" and the concrete scenario ("user drags a task card") grounded the design in real use cases.

**How the output was used:** The six store definitions in the README — including the TypeScript interfaces and responsibility descriptions — are the direct output of this prompt, refined for the specific TaskMatrix data model. The key insight about not using the slice pattern (6 separate files is simpler than one combined slice) came from this exercise.

---

### 4.2 — Optimistic Updates Pattern

**Prompt:**
```
Show me the optimistic update pattern in Zustand for a task status change. The user
drags a card to a new column. The UI should update immediately. If the API call fails,
the card should revert to its original column with an error notification. Use TypeScript.
No React Query — this is pure Zustand + Axios.
```

**Why this prompt:** Optimistic updates are one of the most complex interaction patterns in a CRUD app, and getting the revert-on-failure behavior right requires careful state management. Planning this before writing code avoids brittle implementations.

**How the output was used:** The `updateTaskStatus` function description in `taskStore` reflects this pattern. The implementation preserves the previous status in a local variable before the API call, and uses a try/catch to revert and trigger an error toast on failure.

---

### 4.3 — Derived State and Selectors

**Prompt:**
```
In a Zustand task store with a tasks[] array and a filters object (status, priority,
assigneeId, label, search), how should I implement filtered/sorted task lists without
performance problems? Consider: (1) computed inside the store with a selector function,
(2) computed with useMemo in the component, (3) using a separate derived store.
What are the re-render implications of each approach?
```

**Why this prompt:** This is a subtle performance question that matters at scale. A naive implementation that recomputes on every state change causes unnecessary re-renders across the entire kanban board.

**How the output was used:** The `getFilteredTasks()` selector in `taskStore` and the `getTasksByStatus()` function are the outcome. Components that need filtered tasks subscribe to these selectors (not the raw `tasks` array), which means they only re-render when the computed result actually changes.

---

## 5. API Design Prompts

### 5.1 — REST Endpoint Design

**Prompt:**
```
Design the REST API endpoints for a project management tool with these entities:
users, projects, tasks (with subtasks and comments), and notifications.
For each endpoint, specify: HTTP method, URL, query parameters, request body shape,
and response shape including error cases. Follow REST conventions strictly.
The backend will initially be JSON Server — flag any endpoints that JSON Server
handles natively vs. ones that need custom middleware.
```

**Why this prompt:** A well-designed API contract upfront prevents the backend-frontend mismatch problems that slow down development. The JSON Server flag was important for realistic planning — some endpoints (pagination, nested resources) need workarounds.

**How the output was used:** All API endpoints in the README's Mock API Design section come from this prompt. The query parameter names (`_page`, `_limit` for JSON Server's native pagination) are accurate to how JSON Server works.

---

### 5.2 — Error Handling Strategy

**Prompt:**
```
Design a consistent error handling strategy for an Axios-based API layer in React.
Cover: network errors, 4xx client errors, 5xx server errors, timeout errors, and
auth errors (401 with token refresh, 403 forbidden). The strategy should: centralize
error processing in the Axios interceptor, map API errors to user-facing messages,
and leave component code clean of try/catch for standard errors.
```

**Why this prompt:** Error handling that's handled ad-hoc in each component creates inconsistent UX and maintenance burden. Centralizing it in the interceptor layer is a senior engineering decision that the planning doc should reflect.

**How the output was used:** The Axios interceptor design described in the Security section and API layer folder structure reflects this strategy. Error handling is centralized in `src/lib/api/client.ts`.

---

## 6. Component Architecture Prompts

### 6.1 — Component Responsibility Mapping

**Prompt:**
```
I'm building a kanban board in React. Map out all the components needed for this feature,
from the page level down to atoms. For each component specify:
- What data it receives (props)
- What state it owns (local state)
- What store state it reads from
- What actions it dispatches
- What events it emits upward

Focus on single responsibility. Flag any component that's doing more than one thing.
```

**Why this prompt:** Component boundary decisions are the most impactful design choices in React. A component that owns too much responsibility becomes hard to test and hard to reuse. This prompt was used to validate the component breakdown before writing any code.

**How the output was used:** The kanban component hierarchy (`KanbanBoard` → `StatusColumn` → `TaskCard` → `AddCardButton`) and the clear separation of concerns between them came from this exercise. The discovery that `TaskModal` should live at layout level (not inside `TaskCard`) came from identifying that mounting/unmounting it per-card would be inefficient.

---

### 6.2 — Form Architecture with React Hook Form

**Prompt:**
```
Design the form architecture for a task creation/editing form in React using React Hook Form 7
and Zod 3. The form has 12 fields: title (required), description (rich text), status, priority,
assigneeId, projectId, sprintId, storyPoints, startDate, dueDate, labels (multi-select array),
and subtasks (array of objects). Show me:
1. The Zod schema
2. The RHF form setup with zodResolver
3. How to handle array fields (labels, subtasks)
4. How to handle the optimistic submit flow
```

**Why this prompt:** React Hook Form + Zod is powerful but has subtle complexity around array fields and complex validation rules. Planning the schema structure upfront prevents having to restructure forms mid-development.

**How the output was used:** The `task.schema.ts` file design and the `TaskForm` component's field structure were informed by this prompt. The understanding that `useFieldArray` handles subtasks while a simple controlled multi-select handles labels shaped the component interface.

---

### 6.3 — CommandPalette Architecture

**Prompt:**
```
Design a keyboard-accessible command palette for a web app (⌘K trigger). It should:
- Search tasks, projects, and navigation routes simultaneously
- Show grouped results (Tasks, Projects, Navigation)
- Handle keyboard navigation (arrow keys, enter, escape)
- Show recent/frequent actions when the search input is empty
- Be accessible (ARIA live region, focus management)

What React implementation patterns should I use? Is cmdk the right library?
Compare to building it from scratch with a dialog + input + list.
```

**Why this prompt:** A command palette is one of the highest-polish features in a modern SaaS app. Getting the keyboard interaction and accessibility right requires deliberate design — this is not a "figure it out as you build it" component.

**How the output was used:** The decision to use `cmdk` (the same library powering Vercel's dashboard and shadcn) rather than building from scratch was validated here. The `CommandPalette` component is a wrapper around `cmdk` with TaskMatrix's search data and navigation actions wired in.

---

## 7. Documentation Prompts

### 7.1 — README Product Narrative

**Prompt:**
```
Write the Project Overview section for a README for a project management tool called
TaskMatrix, targeted at engineering teams. It should:
- Explain the business problem without clichés ("in today's fast-paced world")
- Describe who the target users are with specificity (not "anyone who manages projects")
- Explain what TaskMatrix does differently without feature-listing
- Use the product voice of Linear or Vercel — confident, direct, no fluff
- Under 300 words
```

**Why this prompt:** README project overview sections are notoriously generic. This prompt's constraints ("no clichés", "under 300 words", "reference Linear/Vercel voice") were designed to produce something that reads like actual product documentation.

**How the output was used:** The Project Overview section's structure and tone in the README were directly shaped by this prompt. The observation that "Jira is powerful but slow; Asana is fast but shallow" framing was particularly useful.

---

### 7.2 — Technical Documentation Voice

**Prompt:**
```
I'm writing internal engineering documentation for a sprint planning tool.
What makes technical documentation sound like it was written by a senior engineer
rather than generated by AI? Give me specific patterns to use and patterns to avoid,
with examples. Focus on: how to describe architectural decisions, how to write component
responsibility descriptions, and how to frame trade-off discussions.
```

**Why this prompt:** AI-generated documentation has identifiable patterns (overuse of "seamlessly", "leverages", "robust", passive voice everywhere). This prompt was used to audit and improve the README draft for authenticity.

**How the output was used:** This shaped the writing style across the entire README — particularly in the Folder Philosophy section and the component responsibility table entries. Key avoidances: no "leverages", no "seamlessly", no "robust solution". Direct, active voice throughout.

---

### 7.3 — Git Commit Convention

**Prompt:**
```
Generate a realistic git commit history plan for a 6-week frontend development sprint
building a project management tool. Use Conventional Commits format. Include: initial setup,
feature development in a logical build order, bug fixes that would realistically arise,
performance commits, and test commits. The commits should tell a coherent story of
how the app was built.
```

**Why this prompt:** Commit histories reveal how a developer thinks. A planned commit history ensures that commits are logical, atomic, and tell a clear story to a code reviewer or evaluator.

**How the output was used:** The Git Commit Plan in the README reflects this prompt's output, adapted to the specific features of TaskMatrix and reordered to match the sprint roadmap.

---

## 8. Refactoring Prompts

### 8.1 — Component Over-abstraction Detection

**Prompt:**
```
I have a TaskCard component that's grown to 180 lines. It renders: a drag handle,
priority badge, title (truncated), assignee avatar stack, due date with color coding,
label chips, subtask progress bar, and a three-dot context menu. Is this component
too large? How would you break it down, and how do you decide where to draw the line
between extracting a sub-component vs. keeping it inline?
```

**Why this prompt:** Over-componentization is as much of a problem as under-componentization. This prompt helps establish a principled refactoring guideline for the sprint.

**How the output was used:** The decision to keep `TaskCard` as a single component (not split into `TaskCardHeader`, `TaskCardMeta`, etc.) was informed by this analysis. The threshold for extraction is: "would this sub-component be reused elsewhere, or tested independently?" If no, keep it inline.

---

### 8.2 — Performance Refactoring Patterns

**Prompt:**
```
A kanban board with 5 columns and 30 cards per column re-renders all 150 cards whenever
any single card's status changes. How do I fix this in React? Cover: React.memo, useMemo,
Zustand selector subscriptions, and the role of the data structure shape (normalized vs.
denormalized task list) in re-render frequency.
```

**Why this prompt:** Performance problems in kanban boards are well-known and predictable. Planning the solution before building prevents the problem entirely rather than fixing it after the fact.

**How the output was used:** The memoization strategy in the Performance section of the README — `React.memo` on `TaskCard`, `useMemo` on per-column task lists — came from this analysis. The note about `getTasksByStatus()` as a selector in `taskStore` directly addresses the re-render problem.

---

## 9. Testing Strategy Prompts

### 9.1 — Frontend Testing Philosophy

**Prompt:**
```
What's the right testing strategy for a frontend-heavy React/Next.js app with a mock backend?
I have limited time (6-week sprint). What's the highest-ROI test coverage? Compare:
unit tests, integration tests, E2E tests, and visual regression tests. Which test type
catches real production bugs vs. which is mostly busywork? Be honest about the trade-offs.
```

**Why this prompt:** Testing strategy involves real trade-offs in time-constrained sprints. "Be honest about the trade-offs" was added to counteract advice that treats all test types as equally valuable regardless of context.

**How the output was used:** The testing strategy in the README prioritizes integration tests (AuthGuard behavior, form submit flow) over unit tests for pure display components. Visual regression testing is excluded from Sprint 13 scope — it's high maintenance for low bug-catch rate on a new codebase.

---

### 9.2 — Accessibility Testing Approach

**Prompt:**
```
What accessibility issues are most likely to appear in a kanban board web app?
List the top 5, explain why they occur, and tell me how to test for each.
Include: keyboard navigation of drag-and-drop, modal focus management, and
dynamic content updates (notification count, task status changes).
```

**Why this prompt:** Accessibility issues in interactive components (DnD, modals, live updates) are easy to overlook. Identifying them upfront guides implementation decisions.

**How the output was used:** The Accessibility section of the UI Design System and the Manual QA Checklist both reflect the specific issues identified in this prompt's output. The `aria-live="polite"` on notification badge updates was a direct output of this research.

---

## 10. Deployment Prompts

### 10.1 — Vercel Deployment Configuration

**Prompt:**
```
What do I need to configure in Vercel to deploy a Next.js 15 app that uses:
- A separate JSON Server backend (running at a different URL)
- Environment variables for the API URL
- Preview deployments per branch
- A custom 404 page

What can go wrong in a Next.js + Vercel deployment and how do I verify it before
presenting a demo?
```

**Why this prompt:** Deployment issues often surface at the worst time (right before a demo). Anticipating common failure modes and adding them to a checklist prevents scrambling.

**How the output was used:** The Production Checklist in the Deployment section and the Environment Variables table are direct outputs of this prompt. The checklist items around `console.log()` removal and TypeScript compilation errors came specifically from "what can go wrong."

---

### 10.2 — Environment Strategy

**Prompt:**
```
Design an environment variable strategy for a Next.js app that needs to work in
three environments: local development (json-server on localhost:3001), staging
(JSON Server hosted on Railway), and production (Vercel + same Railway backend).
What variables are needed, which should be prefixed with NEXT_PUBLIC_, and
how do I make sure the API URL switches automatically based on environment?
```

**Why this prompt:** `NEXT_PUBLIC_` prefix confusion is one of the most common Next.js gotchas. Designing the environment strategy upfront ensures it works across all three environments without manual variable changes before each deployment.

**How the output was used:** The environment variable table in the Deployment section and the `.env.example` file template are direct outputs of this prompt. The distinction between `NEXT_PUBLIC_API_URL` (exposed to browser) and any future server-only secrets came from this analysis.

---

## Prompts Reference Summary

| # | Domain | Key Decision Made |
|---|--------|------------------|
| 1.1 | Research | Linear's modal pattern → TaskModal at layout level |
| 1.2 | Research | App Router route groups → `(auth)` and `(app)` |
| 1.3 | Research | `@hello-pangea/dnd` over dnd-kit for kanban |
| 1.4 | Research | Zustand over Redux Toolkit for this use case |
| 2.1 | Architecture | Domain-organized `components/` folder structure |
| 2.2 | Architecture | Abstract API layer → zero component changes on backend swap |
| 2.3 | Architecture | Client-side `AuthGuard` over `middleware.ts` |
| 3.1 | UI/UX | HSL color tokens for programmatic manipulation |
| 3.2 | UI/UX | TaskCard limited to 5 data points |
| 3.3 | UI/UX | Bottom tab bar on mobile over hamburger menu |
| 3.4 | UI/UX | `EmptyState` as a first-class component with defined contract |
| 4.1 | State | 6 separate store files over slice pattern |
| 4.2 | State | Optimistic update with revert-on-failure in `taskStore` |
| 4.3 | State | Selector functions for filtered state over `useMemo` in components |
| 5.1 | API | JSON Server-native endpoints vs. custom middleware distinction |
| 5.2 | API | Centralized error handling in Axios interceptor |
| 6.1 | Components | `TaskModal` lives at layout level, not inside `TaskCard` |
| 6.2 | Components | `useFieldArray` for subtasks, controlled multi-select for labels |
| 6.3 | Components | `cmdk` library over custom implementation |
| 7.1 | Docs | Product voice: direct, no clichés, Linear/Vercel tone |
| 7.2 | Docs | Engineering documentation authenticity guidelines |
| 7.3 | Docs | Commit history as narrative of build order |
| 8.1 | Refactoring | `TaskCard` stays as single component — no premature splitting |
| 8.2 | Refactoring | `React.memo` + Zustand selectors to prevent kanban re-renders |
| 9.1 | Testing | Integration tests over unit tests for highest ROI |
| 9.2 | Testing | `aria-live` regions for dynamic content accessibility |
| 10.1 | Deployment | Production checklist: `console.log`, TypeScript, bundle size |
| 10.2 | Deployment | `NEXT_PUBLIC_` prefix strategy for multi-environment API URLs |

---

<div align="center">
  <sub>Prompts.md — Sprint 13 Capstone · TaskMatrix · prodesk-capstone-taskmatrix</sub>
</div>
