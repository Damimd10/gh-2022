export interface Player {
  id: number;
  name: string;
  avatar: string;
  firstVote?: number;
  secondVote?: number;
  votes?: number;
}
