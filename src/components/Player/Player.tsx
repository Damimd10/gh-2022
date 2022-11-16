/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Player as PlayerInterface } from '~/types';

interface Props {
  onSelect: (playerId: number) => void;
  onRemoveVote: (from: number, to: number) => void;
  player: PlayerInterface;
  playerList: PlayerInterface[];
}

function Player({ onSelect, onRemoveVote, player, playerList }: Props) {
  const handleSelect = () => onSelect(player.id);

  const hasVotes = player.firstVote || player.secondVote;

  const handleRemove = (id: number | undefined) => {
    if (!id) return;

    onRemoveVote(player.id, id);
  };

  const getNominatedPlayer = (votedId: number | null | undefined) => {
    if (!votedId) return null;

    const votedPlayer = playerList.find(({ id }) => id === votedId);

    if (!votedPlayer) return null;

    return votedPlayer;
  };

  const firstNominated = getNominatedPlayer(player.firstVote);
  const secondNominated = getNominatedPlayer(player.secondVote);

  return (
    <div className='card element-container'>
      <div className='card-body'>
        <div className='card stat' onClick={handleSelect}>
          <img alt='avatar' className='avatar' src={player.avatar} />
        </div>
        <div className='stat-name'>
          {hasVotes && (
            <div className='nominated-list'>
              {player.firstVote && (
                <div style={{ position: 'relative' }}>
                  <a
                    className='remove-image'
                    href='##'
                    style={{ display: 'inline' }}
                    onClick={() => handleRemove(firstNominated?.id)}
                  >
                    &#215;
                  </a>
                  <img alt='avatar' className='avatar-small' src={firstNominated?.avatar} />
                  <h5 className='card-title small'>{firstNominated?.name}</h5>
                  <span className='uppercase'>2 VOTOS</span>
                </div>
              )}
              {player.secondVote && (
                <div style={{ position: 'relative' }}>
                  <a
                    className='remove-image'
                    href='##'
                    style={{ display: 'inline' }}
                    onClick={() => handleRemove(secondNominated?.id)}
                  >
                    &#215;
                  </a>
                  <img alt='avatar' className='avatar-small' src={secondNominated?.avatar} />
                  <h5 className='card-title small'>{secondNominated?.name}</h5>
                  <span className='uppercase'>1 VOTO</span>
                </div>
              )}
            </div>
          )}
          <hr className='color1' />
          <h5 className='card-title'>{player.name}</h5>
        </div>
      </div>
    </div>
  );
}

export default Player;
