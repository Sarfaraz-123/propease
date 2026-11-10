import { useAuth } from "@/lib/auth";
import { Redirect, Slot } from "expo-router";
import { useUserSync } from "@/hooks/useUserSync";
import { isDemoMode } from "@/lib/demo";

export default function RootLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (isDemoMode) return <Slot />;

  useUserSync();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/sign-in" />;

  return <Slot />;
}
