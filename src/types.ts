export interface Player {
  id: number;
  name: string;
  avatar: string;
  firstVote?: number | null;
  secondVote?: number | null;
  votes?: number;
}
