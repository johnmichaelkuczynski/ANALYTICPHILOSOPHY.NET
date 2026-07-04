import { useSignIn } from "@clerk/react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// Launches Google OAuth directly (no intermediate sign-in page). Click 1 is
// the button that calls this; click 2 is Google's account chooser; then the
// user lands inside the app.
export function useGoogleSignIn() {
  const { signIn } = useSignIn();

  return async () => {
    if (!signIn) return;
    await signIn.sso({
      strategy: "oauth_google",
      redirectUrl: `${basePath}/dashboard`,
      redirectCallbackUrl: `${basePath}/sign-in/sso-callback`,
    });
  };
}
