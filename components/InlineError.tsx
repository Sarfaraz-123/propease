import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function InlineError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <View className="mx-5 my-6 rounded-2xl bg-[#FFF1F1] border border-[#F6CACA] p-4 flex-row items-center">
      <Ionicons name="alert-circle-outline" size={22} color="#C24141" />
      <Text className="flex-1 text-[#8F3030] text-sm ml-3">{message}</Text>
      {onRetry && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Retry"
          onPress={onRetry}
          className="bg-white rounded-xl px-3 py-2"
        >
          <Text className="text-[#B33E3E] text-xs font-bold">Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
