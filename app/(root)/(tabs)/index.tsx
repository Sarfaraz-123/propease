import FeaturedCard from "@/components/FeaturedCard";
import PropertyCard from "@/components/PropertyCard";
import { supabase } from "@/lib/supabase";
import { Property } from "@/types";
import { useUser } from "@/lib/auth";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { demoProperties, isDemoMode } from "@/lib/demo";
import PropertySkeleton from "@/components/PropertySkeleton";
import EmptyState from "@/components/EmptyState";
import InlineError from "@/components/InlineError";

const categories = [
  { label: "All homes", icon: "grid-outline" as const },
  { label: "Apartments", icon: "business-outline" as const },
  { label: "Houses", icon: "home-outline" as const },
  { label: "Villas", icon: "sparkles-outline" as const },
];

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();

  const [featured, setFeatured] = useState<Property[]>([]);
  const [recommended, setRecommended] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      fetchProperties();
    }, [])
  );

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);

    if (isDemoMode) {
      setFeatured(demoProperties.filter((property) => property.is_featured));
      setRecommended(demoProperties.filter((property) => !property.is_featured));
      setLoading(false);
      return;
    }

    const { data: featuredData, error: featuredError } = await supabase
      .from("properties")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    const { data: recommendedData, error: recommendedError } = await supabase
      .from("properties")
      .select("*")
      .eq("is_featured", false)
      .order("created_at", { ascending: false });

    if (featuredError || recommendedError) {
      setError("We couldn't load properties right now.");
    }
    setFeatured(featuredData ?? []);
    setRecommended(recommendedData ?? []);
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FFF9EF]">
      <FlatList
        data={recommended}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
              <Image
                source={require("../../../assets/images/propease.png")}
                style={{ width: 118, height: 54 }}
                resizeMode="contain"
              />
              <View className="flex-row items-center gap-3">
                <View className="items-end">
                  <Text className="text-[#7B8498] text-xs">Good morning</Text>
                  <Text className="text-[#14213D] text-base font-bold">
                    {user?.firstName ?? "Explorer"}
                  </Text>
                </View>
                <View className="w-10 h-10 rounded-2xl bg-[#14213D] items-center justify-center">
                  <Ionicons name="person-outline" size={18} color="#F6D778" />
                </View>
              </View>
            </View>

            <View
              className="mx-5 mb-5 rounded-[30px] bg-[#BFE0FA] px-5 py-6 overflow-hidden"
              style={{
                shadowColor: "#6E9BC0",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.22,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <View className="absolute -right-10 -top-12 w-44 h-44 rounded-full bg-[#8CC4F0]" />
              <View className="absolute right-8 -bottom-20 w-40 h-40 rounded-full bg-[#F6D778]/70" />
              <View
                className="absolute right-8 top-10 w-20 h-20 rounded-3xl bg-white/30"
                style={{
                  transform: [
                    { perspective: 700 },
                    { rotateX: "24deg" },
                    { rotateY: "-28deg" },
                    { rotateZ: "18deg" },
                  ],
                }}
              />
              <View
                className="absolute right-12 top-14 w-16 h-16 rounded-3xl border-2 border-white/50"
                style={{
                  transform: [
                    { perspective: 700 },
                    { rotateX: "24deg" },
                    { rotateY: "-28deg" },
                    { rotateZ: "18deg" },
                  ],
                }}
              />
              <View
                className="absolute right-16 top-[88px] w-12 h-3 rounded-full bg-[#245C91]/25"
                style={{
                  transform: [
                    { perspective: 700 },
                    { rotateX: "65deg" },
                    { rotateY: "-20deg" },
                    { rotateZ: "18deg" },
                  ],
                }}
              />
              <View className="flex-row items-center self-start bg-white/60 rounded-full px-3 py-1.5 mb-3">
                <Ionicons name="location" size={13} color="#245C91" />
                <Text className="text-[#245C91] text-xs font-bold ml-1.5">
                  Discover your space
                </Text>
              </View>
              <Text className="text-[#245C91] text-xs font-bold uppercase tracking-widest mb-2">
                Find your next address
              </Text>
              <Text className="text-[#14213D] text-3xl font-extrabold leading-9 mb-2">
                A place that feels{"\n"}like home.
              </Text>
              <Text className="text-[#426583] text-sm mb-5 max-w-[230px]">
                Discover handpicked homes made for your lifestyle.
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(root)/(tabs)/search")}
                className="self-start flex-row items-center bg-[#14213D] rounded-2xl px-5 py-3.5"
              >
                <Text className="text-[#F6D778] font-bold mr-2">Explore homes</Text>
                <Ionicons name="arrow-forward" size={16} color="#F6D778" />
              </TouchableOpacity>
              <View
                className="absolute right-5 bottom-5 flex-row items-center bg-white/60 rounded-2xl px-3 py-2"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.18,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Ionicons name="sparkles" size={14} color="#245C91" />
                <Text className="text-[#245C91] text-xs font-semibold ml-1.5">Curated homes</Text>
              </View>
            </View>

            {/* Search Bar */}
            <TouchableOpacity
              onPress={() => router.push("/(root)/(tabs)/search")}
              className="mx-5 mb-7 flex-row items-center bg-white rounded-2xl px-4 py-3.5 gap-3 border border-[#E8ECF4]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Ionicons name="search-outline" size={18} color="#9CA3AF" />
              <Text className="text-gray-400 text-sm flex-1">
                Search properties, cities...
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(root)/(tabs)/search",
                    params: { openFilters: "true" },
                  })
                }
                className="w-9 h-9 bg-[#5B9FE3] rounded-xl items-center justify-center"
              >
                <Ionicons name="options-outline" size={15} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>

            <FlatList
              data={categories}
              horizontal
              keyExtractor={(item) => item.label}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => router.push("/(root)/(tabs)/search")}
                  className={`flex-row items-center rounded-2xl px-4 py-3 mr-2 border ${
                    index === 0
                      ? "bg-[#14213D] border-[#14213D]"
                      : "bg-white border-[#DDE8F3]"
                  }`}
                >
                  <Ionicons
                    name={item.icon}
                    size={15}
                    color={index === 0 ? "#F6D778" : "#5B9FE3"}
                  />
                  <Text
                    className={`text-xs font-bold ml-2 ${
                      index === 0 ? "text-white" : "text-[#426583]"
                    }`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {/* Featured Section */}
            <View className="mb-6">
              <View className="flex-row items-center justify-between px-5 mb-4">
                <Text className="text-[#14213D] text-xl font-bold">
                Featured
                </Text>
                <Text className="text-[#7B8498] text-xs font-semibold">Handpicked for you</Text>
              </View>

              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#2563EB"
                  className="py-10"
                />
              ) : (
                <FlatList
                  data={featured}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <FeaturedCard property={item} />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                />
              )}
            </View>

            {error && <InlineError message={error} onRetry={fetchProperties} />}

            {/* Recommended Header */}
            <View className="flex-row items-center justify-between px-5 mb-4">
              <Text className="text-[#14213D] text-xl font-bold">Recommended</Text>
              <Ionicons name="sparkles-outline" size={18} color="#E6B93F" />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View className="px-5">
            <PropertyCard property={item} />
          </View>
        )}
        ListEmptyComponent={
          !loading && !error ? (
            <EmptyState
              icon="home-outline"
              title="No homes to show"
              message="New listings will appear here as soon as they are available."
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
