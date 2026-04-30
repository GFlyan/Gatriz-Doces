import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="error" options={{ title: "Error" }} />
      <Stack.Screen name="authenticated" options={{ headerShown: false }} />
    </Stack>
  );
}
