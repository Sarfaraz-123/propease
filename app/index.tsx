import { Redirect } from "expo-router";
import { useAuth } from "@/lib/auth";
import { isDemoMode } from "@/lib/demo";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  if (isDemoMode) return <Redirect href="/(root)/(tabs)" />;

  if (!isLoaded) return null;

  if (isSignedIn) return <Redirect href="/(root)/(tabs)" />;

  return <Redirect href="/sign-in" />;
}
