import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function EmptyState({
  icon = "search-outline",
  title,
  message,
}: {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
}) {
  return (
    <View className="items-center justify-center py-20 px-8">
      <View className="w-20 h-20 rounded-[28px] bg-[#EAF4FF] items-center justify-center mb-5">
        <Ionicons name={icon} size={36} color="#5B9FE3" />
      </View>
      <Text className="text-[#14213D] text-lg font-bold text-center mb-2">
        {title}
      </Text>
      <Text className="text-[#6B7890] text-sm text-center leading-5">
        {message}
      </Text>
    </View>
  );
}
