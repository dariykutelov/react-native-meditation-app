import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { meditations } from '~/data';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function MeditationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top } = useSafeAreaInsets();

  const meditation = meditations.find((m) => m.id === Number(id));

  if (!meditation) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg">Meditation not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
       <Text className="text-3xl font-bold mb-4">{meditation.title}</Text>
       <AntDesign 
        className='absolute right-4'
        style={{ top: top + 8 }} 
        name="close" size={20} color="black" onPress={() => router.back()} />
    </SafeAreaView>
  );
} 