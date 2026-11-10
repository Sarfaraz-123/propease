import { ClerkProvider, tokenCache } from "@/lib/auth";
import { Slot } from "expo-router";
import "../global.css";

const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ??
  "pk_test_Y2xlcmsuZXhhbXBsZS5jb20k";

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Slot />
    </ClerkProvider>
  );
}
