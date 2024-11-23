import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";

import { meditations } from "~/data";
import audio from "../../../assets/meditations/audio1.mp3";
const audioUrl = "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav";

export default function MeditationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const meditation = meditations.find((m) => m.id === Number(id));
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          {},
          onPlaybackStatusUpdate
        );
        setSound(sound);

        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis || 0);
        }
      } catch (error) {
        console.error("Error loading sound:", error);
      }
    }

    loadSound();

    return () => {
      sound?.unloadAsync();
    };
  }, []);

  const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  async function handlePlayPause() {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        if (position === duration) {
          await sound.setPositionAsync(0);
        }
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error playing/pausing:", error);
    }
  }

  // Format time helper function
  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

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

        <Pressable
          onPress={handlePlayPause}
          className="bg-zinc-800 rounded-full w-20 aspect-square items-center justify-center self-center"
        >
          <FontAwesome6
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="snow"
          />
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
                value={position}
                minimumValue={0}
                maximumValue={duration}
                thumbTintColor="#303937"
                minimumTrackTintColor="#303937"
                maximumTrackTintColor="#30393755"
                onSlidingComplete={async (value) => {
                  if (sound) {
                    await sound.setPositionAsync(value);
                  }
                }}
              />
            </View>

            <View className="flex-row justify-between">
              <Text>{formatTime(position)}</Text>
              <Text>{formatTime(duration)}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
