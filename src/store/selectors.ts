import { groupBy } from 'ramda';
import { Player as PlayerInterface } from '~/types';
import { PlayerState } from './players';

export const getSelectedPlayer = (state: PlayerState) =>
  state.players.find(({ id }) => id === state.selected);

export const getVotes = (state: PlayerState) => {
  const byFirstVote = groupBy((currentPlayer: any) => currentPlayer.firstVote);

  const bySecondVote = groupBy((currentPlayer: any) => currentPlayer.secondVote);

  const firstVotes = byFirstVote(state.players);
  const secondVotes = bySecondVote(state.players);

  const getTotal = (id: number) => {
    const twoVotes = (firstVotes[id] || []).length * 2;
    const oneVote = (secondVotes[id] || []).length;

    return twoVotes + oneVote;
  };

  const mappedPlayers = state.players
    .map((currentPlayer) => ({
      ...currentPlayer,
      votes: getTotal(currentPlayer.id),
    }))
    .filter((currentPlayer) => currentPlayer.votes > 0)
    .sort((a, b) => b.votes - a.votes);

  const hasVotes = state.players.some(
    ({ firstVote, secondVote }) => Boolean(firstVote) || Boolean(secondVote),
  );

  return { mappedPlayers, hasVotes };
};

export const filteredNominationPlayerList = (player: PlayerInterface) => (state: PlayerState) => {
  const nominatedList = state.players.filter(
    (current) =>
      current.id !== player.id &&
      player.firstVote !== current.id &&
      player.secondVote !== current.id,
  );

  return {
    newSelected: nominatedList[Math.round(nominatedList.length / 2)],
    nominatedList,
    setVote: state.setVote,
  };
};
