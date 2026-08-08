import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Sidebar } from '../Sidebar';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

// Mock dependencies
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// We only want to test the sidebar's behavior, not Firebase
vi.mock('firebase/auth', () => ({
  signOut: vi.fn(),
  getAuth: vi.fn(),
}));
vi.mock('@/lib/firebase/client', () => ({
  auth: {},
}));

describe('Sidebar Component', () => {
  beforeEach(() => {
    useAuthStore.setState({ 
      user: { uid: '123', email: 'test@example.com', displayName: 'Test User' } as unknown as import('firebase/auth').User,
      isAuthenticated: true,
      isLoading: false
    });
    useUIStore.setState({ sidebarOpen: true });
    vi.clearAllMocks();
  });

  it('renders the brand logo and text', () => {
    render(<Sidebar />);
    expect(screen.getByText('TaskMatrix')).toBeInTheDocument();
  });

  it('collapses when toggle button is clicked', () => {
    const spy = vi.spyOn(useUIStore.getState(), 'toggleSidebar');
    
    const { container } = render(<Sidebar />);
    // Find the toggle button (the one containing chevron icon)
    const buttons = container.querySelectorAll('button');
    const toggleBtn = buttons[0]; // Assuming it's the first button
    
    fireEvent.click(toggleBtn);
    expect(spy).toHaveBeenCalled();
  });

  it('shows user display name when open', () => {
    render(<Sidebar />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
});
