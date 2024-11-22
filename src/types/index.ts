export type MeditationType = 'audio' | 'video';

export type Meditation = {
  id: number;
  title: string;
  duration: number; 
  type: MeditationType;
  pro: boolean;
}; 