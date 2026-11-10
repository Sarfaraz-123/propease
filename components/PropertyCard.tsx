import { useSavedProperty } from "@/hooks/useSavedProperty";
import { formatPrice } from "@/lib/utils";
import { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { useRef } from "react";

export default function PropertyCard({
  property,
  onUnsave,
  showSave = false,
}: {
  property: Property;
  onUnsave?: () => void;
  showSave?: boolean;
}) {
  const router = useRouter();
  const { isSaved, saveLoading, toggleSave } = useSavedProperty(
    property.id,
    onUnsave
  );
  const pressScale = useRef(new Animated.Value(1)).current;

  const animatePress = (toValue: number) => {
    Animated.spring(pressScale, {
      toValue,
      useNativeDriver: true,
      speed: 28,
      bounciness: 5,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ perspective: 1000 }, { scale: pressScale }],
      }}
    >
      <TouchableOpacity
        onPress={() => router.push(`/(root)/property/${property.id}`)}
        onPressIn={() => animatePress(0.98)}
        onPressOut={() => animatePress(1)}
        className="flex-row bg-white rounded-[24px] mb-5 overflow-hidden border border-[#DDE8F3]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.14,
        shadowRadius: 12,
        elevation: 5,
        opacity: property.is_sold ? 0.5 : 1,
      }}
      >
      {/* Image */}
      <Image
        source={{ uri: property.images[0] }}
        className="w-36 h-36"
        resizeMode="cover"
      />
      <View className="absolute left-0 top-0 bottom-0 w-36 bg-[#14213D]/10" />

      {/* Info */}
      <View className="flex-1 p-3.5 justify-between">
        <View>
          <Text
            className="text-sm font-bold text-[#14213D] mb-1"
            numberOfLines={1}
          >
            {property.title}
          </Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="location-outline" size={11} color="#6B7280" />
            <Text className="text-xs text-[#7B8498]" numberOfLines={1}>
              {property.city}
            </Text>
          </View>

          <View className="absolute left-3 top-3 bg-white/90 rounded-full px-2 py-1">
            <Text className="text-[10px] text-[#5B9FE3] font-bold capitalize">
              {property.type}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-[#5B9FE3] font-bold text-sm">
            {formatPrice(property.price)}
          </Text>
          {property.is_sold && (
            <View className="bg-red-50 px-2 py-0.5 rounded-full">
              <Text className="text-red-500 text-xs font-semibold">Sold</Text>
            </View>
          )}
          <View className="flex-row gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="bed-outline" size={11} color="#6B7280" />
              <Text className="text-xs text-gray-500">
                {property.bedrooms} bd
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="expand-outline" size={11} color="#6B7280" />
              <Text className="text-xs text-gray-500">
                {property.area_sqft} ft²
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Save Button */}
      {showSave && (
        <TouchableOpacity
          onPress={toggleSave}
          disabled={saveLoading}
          className="w-10 items-center pt-3"
        >
          <Ionicons
            name={isSaved ? "heart" : "heart-outline"}
            size={18}
            color={isSaved ? "#EF4444" : "#9CA3AF"}
          />
        </TouchableOpacity>
      )}
      </TouchableOpacity>
    </Animated.View>
  );
}
