import { ReactNode, useMemo } from "react";
import { isDemoMode } from "@/lib/demo";

const demoUser = {
  id: "demo-user",
  firstName: "david",
  lastName: "johnson",
  imageUrl: "https://i.pravatar.cc/200?img=12",
  emailAddresses: [{ emailAddress: "example-100@gmail.com" }],
  setProfileImage: async () => {},
};

export const tokenCache = isDemoMode
  ? null
  : require("@clerk/expo/token-cache").tokenCache;

export function ClerkProvider({
  children,
  publishableKey,
  tokenCache,
}: {
  publishableKey: string;
  tokenCache: unknown;
  children: ReactNode;
}) {
  if (isDemoMode) return <>{children}</>;
  const { ClerkProvider: Provider } = require("@clerk/expo");
  return (
    <Provider publishableKey={publishableKey} tokenCache={tokenCache}>
      {children}
    </Provider>
  );
}

export function useAuth() {
  if (isDemoMode) {
    return useMemo(
      () => ({
        isSignedIn: true,
        isLoaded: true,
        userId: demoUser.id,
        getToken: async () => null,
        signOut: async () => {},
      }),
      []
    );
  }
  return require("@clerk/expo").useAuth();
}

export function useUser() {
  if (isDemoMode) return useMemo(() => ({ user: demoUser, isLoaded: true }), []);
  return require("@clerk/expo").useUser();
}

export function useSignIn() {
  if (isDemoMode) {
    return useMemo(
      () => ({
        signIn: {
          status: "idle",
          password: async () => ({ error: null }),
          mfa: {
            sendPhoneCode: async () => {},
            sendEmailCode: async () => {},
            verifyEmailCode: async () => {},
          },
          supportedSecondFactors: [],
          finalize: async () => {},
          reset: () => {},
        },
        errors: [],
        fetchStatus: "idle",
      }),
      []
    );
  }
  return require("@clerk/expo").useSignIn();
}

export function useSignUp() {
  if (isDemoMode) {
    return useMemo(
      () => ({
        signUp: {
          status: "idle",
          password: async () => ({ error: null }),
          verifications: {
            sendEmailCode: async () => {},
            verifyEmailCode: async () => {},
          },
          unverifiedFields: [],
          missingFields: [],
          finalize: async () => {},
          reset: () => {},
        },
        errors: [],
        fetchStatus: "idle",
      }),
      []
    );
  }
  return require("@clerk/expo").useSignUp();
}
