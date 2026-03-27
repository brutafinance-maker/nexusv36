
export interface RankingUser {
  rank: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
}

export const MOCK_RANKING: RankingUser[] = [
  { rank: 1, name: "Dr. Roberto Santos", points: 1250, isCurrentUser: false },
  { rank: 5, name: "Você", points: 745, isCurrentUser: true }
];
