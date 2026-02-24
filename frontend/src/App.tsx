import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Learning } from './pages/Learning';
import { MemoryMatch } from './pages/MemoryMatch';
import { Draw } from './pages/Draw';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const learningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learning',
  component: Learning,
});

const memoryMatchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/memory-match',
  component: MemoryMatch,
});

const drawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/draw',
  component: Draw,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  learningRoute,
  memoryMatchRoute,
  drawRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
