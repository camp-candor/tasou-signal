import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

// Define which routes are public
const isPublicRoute = createRouteMatcher([
  '/', // The homepage
  '/sign-in(.*)', // The sign-in page and its sub-routes
  '/sign-up(.*)', // The sign-up page and its sub-routes
]);

// Define which routes are protected
const isProtectedRoute = createRouteMatcher([
  '/account(.*)', // Protects /account, /account/profile, /account/settings, etc.
  '/play(.*)',    // Assuming you have a /play page for the game iframe
]);

export default clerkMiddleware((auth, context) => {
  const { userId, redirectToSignIn } = auth();

  // If the user is on a protected route and is not logged in...
  if (isProtectedRoute(context.request) && !userId) {
    // ...redirect them to the sign-in page.
    return redirectToSignIn();
  }

  // If the user is logged in and tries to visit a public-only route (like sign-in)...
  if (userId && isPublicRoute(context.request)) {
    // ...redirect them to their account profile page.
    // This prevents logged-in users from seeing the login form.
    return context.redirect('/account/profile');
  }
});

// The onRequest export is necessary for the middleware to run.
export const onRequest = clerkMiddleware();