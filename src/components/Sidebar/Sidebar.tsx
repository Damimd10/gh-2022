import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button } from 'semantic-ui-react';
import usePlayersStore from '~/store/players';
import { filteredNominationPlayerList } from '~/store/selectors';

import { Player as PlayerInterface } from '~/types';

interface Props {
  player: PlayerInterface;
}

function Sidebar({ player }: Props) {
  const { newSelected, nominatedList, setVote } = usePlayersStore(
    filteredNominationPlayerList(player),
  );

  const defaultPlayerSelected = nominatedList[Math.round(nominatedList.length / 2)];

  const [selectedPlayer, setSelectecPlayer] = useState(defaultPlayerSelected.id);

  useEffect(() => {
    setSelectecPlayer(newSelected.id);
  }, [newSelected]);

  const handleSelected = (_slideId: number, item: any) => {
    const id = Number(item.props.children.props.id);
    setSelectecPlayer(id);
  };

  const handleVote = (toId: number) => setVote(player.id, toId);

  return (
    <div className='sidebar-wrap'>
      <img alt='avatar' className='avatar-big' src={player.avatar} />
      <Carousel
        centerMode
        width='150px'
        showStatus={false}
        autoPlay={false}
        showIndicators={false}
        dynamicHeight={false}
        selectedItem={Math.round(nominatedList.length / 2)}
        onChange={handleSelected}
      >
        {nominatedList.map((currentPlayer) => {
          return (
            <div key={currentPlayer.id}>
              <img alt='avatar' id={String(currentPlayer.id)} src={currentPlayer.avatar} />
            </div>
          );
        })}
      </Carousel>
      {player.firstVote && player.secondVote ? null : (
        <Button onClick={() => handleVote(selectedPlayer)}>VOTAR</Button>
      )}
    </div>
  );
}

export default Sidebar;
