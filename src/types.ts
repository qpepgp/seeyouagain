
export type Category = '산책' | '차 한잔' | '식사' | '장보기';
export type MeetupStatus = 'seed' | 'sprout' | 'flower';
export type AgeGroup = '50대' | '60대' | '70대';

export interface Meetup {
  id: string;
  title: string;
  time: string;
  place: string;
  category: Category;
  description: string;
  participants: number;
  maxParticipants: number;
  status: MeetupStatus;
  seedsRequired: number;
  hostName: string;
  hostAgeGroup: AgeGroup;
  distance: string;
  createdAt: string; // ISO string for 24h lifecycle
}

export type Screen = 
  | 'LANDING' 
  | 'ONBOARDING'
  | 'BROWSE' 
  | 'SWIPE'
  | 'MATCH_LIST'
  | 'DETAIL' 
  | 'PRE_JOIN' 
  | 'VERIFY_NEIGHBORHOOD' 
  | 'JOIN_CONFIRM' 
  | 'JOIN_SENT' 
  | 'CREATE' 
  | 'CONFIRMED';

export interface UserProfile {
  nickname: string;
  ageGroup: AgeGroup;
  seeds: number;
  isNeighborhoodVerified: boolean;
}

export interface AppState {
  currentScreen: Screen;
  user?: UserProfile;
  selectedMeetupId?: string;
  userNeighborhood?: string;
  joinRequestSent: boolean;
  confirmedMeetupId?: string;
  interestedMeetupIds: string[];
}
