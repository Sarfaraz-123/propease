import { useRouter } from "expo-router";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function FeaturedCard({ property }: { property: Property }) {
  const router = useRouter();
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
        transform: [
          { perspective: 1000 },
          { scale: pressScale },
        ],
      }}
    >
      <TouchableOpacity
        onPress={() => router.push(`/(root)/property/${property.id}`)}
        onPressIn={() => animatePress(0.97)}
        onPressOut={() => animatePress(1)}
        className="w-80 mr-4 rounded-[28px] overflow-hidden bg-white border border-[#DDE8F3]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 16,
        elevation: 7,
        opacity: property.is_sold ? 0.5 : 1,
      }}
      >
      {/* Image */}
      <Image
        source={{ uri: property.images[0] }}
        className="w-full h-48"
        resizeMode="cover"
      />
      <View className="absolute left-0 right-0 top-32 h-16 bg-[#14213D]/25" />

      {/* Badge */}
      <View className="absolute top-3 left-3 bg-[#14213D]/90 px-3 py-1.5 rounded-full">
        <Text className="text-xs font-bold text-[#F6D778] capitalize">
          {property.type}
        </Text>
      </View>

      {property.is_sold && (
        <View className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full">
          <Text className="text-xs font-semibold text-white">Sold</Text>
        </View>
      )}

      {/* Info */}
      <View className="p-5">
        <Text
          className="text-base font-bold text-[#14213D] mb-1"
          numberOfLines={1}
        >
          {property.title}
        </Text>

        <View className="flex-row items-center gap-1 mb-3">
          <Ionicons name="location-outline" size={13} color="#6B7280" />
          <Text className="text-xs text-[#7B8498]" numberOfLines={1}>
            {property.address}, {property.city}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-[#5B9FE3] font-bold text-base">
            {formatPrice(property.price)}
          </Text>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="bed-outline" size={13} color="#6B7280" />
              <Text className="text-xs text-gray-500">{property.bedrooms}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="water-outline" size={13} color="#6B7280" />
              <Text className="text-xs text-gray-500">
                {property.bathrooms}
              </Text>
            </View>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
