import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga';
// import * as htmlToImage from 'html-to-image';

import PartialNomination from './components/PartialNomination';
import PlayerList from './components/PlayerList';
import Sidebar from './components/Sidebar';

import usePlayersStore from './store/players';
import { getSelectedPlayer } from './store/selectors';

import 'semantic-ui-css/semantic.min.css';

function App() {
  const domElement = useRef(null);

  useEffect(() => {
    ReactGA.initialize('UA-166054317-1');
    ReactGA.pageview('Home');
  }, []);

  const currentPlayer = usePlayersStore(getSelectedPlayer);
  const activeClass = currentPlayer ? 'layout sidebar' : 'layout';

  /* const testing = async () => {
    if (!domElement.current) return;

    const dataUrl = await htmlToImage.toPng(domElement.current);
    const link = document.createElement('a');

    link.download = 'html-to-image.png';
    link.href = dataUrl;
    link.click();
  }; */

  return (
    <div ref={domElement}>
      <div className={activeClass}>
        <PlayerList />
        {currentPlayer && <Sidebar player={currentPlayer} />}
      </div>
      <PartialNomination />
    </div>
  );
}

export default App;
