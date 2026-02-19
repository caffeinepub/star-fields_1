import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import HomePage from './pages/HomePage';
import NakshatraDetailPage from './pages/NakshatraDetailPage';
import AdminPage from './pages/AdminPage';
import AdminEditPage from './pages/AdminEditPage';
import Layout from './components/Layout';
import AdminGuard from './components/AdminGuard';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <HomePage />,
});

const nakshatrasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/nakshatras',
  component: () => <HomePage />,
});

const nakshatraDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/nakshatras/$slug/$section',
  component: () => <NakshatraDetailPage />,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminGuard>
      <AdminPage />
    </AdminGuard>
  ),
});

const adminEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/nakshatras/$id',
  component: () => (
    <AdminGuard>
      <AdminEditPage />
    </AdminGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  nakshatrasRoute,
  nakshatraDetailRoute,
  adminRoute,
  adminEditRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
