import { FlatList } from "react-native";
import { meditations } from "~/data";
import { MeditationListItem } from "~/components/MeditationListItem";

export default function HomeScreen() {
  return (
    <FlatList
      data={meditations}
      renderItem={({ item }) => <MeditationListItem meditation={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerClassName="gap-8 p-4"
      className="bg-white"
      showsVerticalScrollIndicator={false}
    />
  );
}
