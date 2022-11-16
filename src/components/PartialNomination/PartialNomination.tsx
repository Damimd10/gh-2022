import usePlayersStore from '~/store/players';
import { getVotes } from '~/store/selectors';

function PartialNomination() {
  const { hasVotes, mappedPlayers } = usePlayersStore(getVotes);

  if (!hasVotes) return null;

  return (
    <div
      style={{
        backgroundColor: 'rgba(23,25,65, 0.6)',
        position: 'sticky',
        bottom: 0,
        width: 'calc(100% - 18px)',
        padding: 10,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ textTransform: 'uppercase', color: '#FFF' }}>Placa Parcial</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        {mappedPlayers.map((currentPlayer) => (
          <div
            key={currentPlayer.id}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img alt='avatar' className='avatar-small' src={currentPlayer.avatar} />
            <h5 className='card-title small uppercase' style={{ margin: 0 }}>
              {currentPlayer.name}
            </h5>
            <span className='uppercase' style={{ color: '#FFF' }}>
              {currentPlayer.votes} VOTOS
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartialNomination;
