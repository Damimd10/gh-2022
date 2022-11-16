import Player from '~/components/Player';
import usePlayersStore from '~/store/players';

function PlayerList() {
  const { players, setSelected, removeVote } = usePlayersStore();

  return (
    <div className='player-list'>
      {players.map((player) => (
        <Player
          key={player.id}
          onSelect={setSelected}
          onRemoveVote={removeVote}
          player={player}
          playerList={players}
        />
      ))}
    </div>
  );
}

export default PlayerList;
