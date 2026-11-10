import { View } from "react-native";

export default function PropertySkeleton() {
  return (
    <View className="flex-row bg-white rounded-[24px] mb-5 overflow-hidden border border-[#DDE8F3]">
      <View className="w-36 h-36 bg-[#EAF4FF]" />
      <View className="flex-1 p-4 justify-between">
        <View>
          <View className="h-4 w-4/5 rounded-full bg-[#EAF4FF] mb-3" />
          <View className="h-3 w-2/5 rounded-full bg-[#F0F2F5]" />
        </View>
        <View className="h-4 w-2/5 rounded-full bg-[#DDEBFA]" />
      </View>
    </View>
  );
}
