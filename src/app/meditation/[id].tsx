import { View, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { meditations } from "~/data";
import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

export default function MeditationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const meditation = meditations.find((m) => m.id === Number(id));

  if (!meditation) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg">Meditation not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-2 justify-between bg-orange-400">
      <View className="flex-1">
        <View className="flex-1">
          <View className="flex-row items-center justify-between p-10">
            <AntDesign
              name="infocirlce"
              size={20}
              color="black"
              onPress={() => {}}
            />
            <View className="bg-zinc-800 rounded-md p-2">
              <Text className="text-zinc-100 text-sm font-semibold">
                Today's Meditation
              </Text>
            </View>
            <AntDesign
              name="close"
              size={20}
              color="black"
              onPress={() => router.back()}
            />
          </View>
          <Text className="text-3xl font-semibold text-center mt-10 text-zinc-800">
            {meditation.title}
          </Text>
        </View>

        <Pressable className="bg-zinc-800 rounded-full w-20 aspect-square items-center justify-center self-center">
          <FontAwesome6 name="play" size={24} color="snow" />
        </Pressable>

        <View className="flex-1">
          <View className="p-5 mt-auto gap-5">
            <View className="flex-row justify-between">
              <MaterialIcons name="airplay" size={24} color="#303937" />
              <MaterialCommunityIcons
                name="cog-outline"
                size={24}
                color="#303937"
              />
            </View>

            <View>
              <Slider
                value={0.5}
                minimumValue={0}
                maximumValue={1}
                thumbTintColor="#303937"
                minimumTrackTintColor="#303937"
                maximumTrackTintColor="#30393755"
                onSlidingComplete={(value) => {}}
              />
            </View>

            <View className="flex-row justify-between">
              <Text>03:23</Text>
              <Text>13:14</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
