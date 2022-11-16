import create from 'zustand';

import { Player } from '~/types';

import agustinAvatar from '~/assets/images/agustin.jpg';
import alexisAvatar from '~/assets/images/alexis.jpg';
import constanzaAvatar from '~/assets/images/constanza.jpg';
import danielaAvatar from '~/assets/images/daniela.jpg';
import juanAvatar from '~/assets/images/juan.jpg';
import julianaAvatar from '~/assets/images/juliana.jpg';
import julietaAvatar from '~/assets/images/julieta.jpg';
import lucilaAvatar from '~/assets/images/lucila.jpg';
import marcoAvatar from '~/assets/images/marco.jpg';
import mariaLauraAvatar from '~/assets/images/maria-laura.jpg';
import maxiAvatar from '~/assets/images/maxi.jpg';
import nachoAvatar from '~/assets/images/nacho.jpg';
import rominaAvatar from '~/assets/images/romina.jpg';
import thiagoAvatar from '~/assets/images/thiago.jpg';
import walterAvatar from '~/assets/images/walter.jpg';

const PLAYERS: Player[] = [
  { id: 1, name: 'Agustin', avatar: agustinAvatar },
  { id: 2, name: 'Alexis', avatar: alexisAvatar },
  { id: 3, name: 'Constanza', avatar: constanzaAvatar },
  { id: 4, name: 'Daniela', avatar: danielaAvatar },
  { id: 5, name: 'Juan', avatar: juanAvatar },
  { id: 6, name: 'Juliana', avatar: julianaAvatar },
  { id: 7, name: 'Julieta', avatar: julietaAvatar },
  { id: 8, name: 'Lucila', avatar: lucilaAvatar },
  { id: 9, name: 'Marcos', avatar: marcoAvatar },
  { id: 10, name: 'Maria Laura', avatar: mariaLauraAvatar },
  { id: 11, name: 'Maxi', avatar: maxiAvatar },
  { id: 12, name: 'Nacho', avatar: nachoAvatar },
  { id: 13, name: 'Romina', avatar: rominaAvatar },
  { id: 14, name: 'Thiago', avatar: thiagoAvatar },
  { id: 15, name: 'Walter', avatar: walterAvatar },
];

export interface PlayerState {
  players: Player[];
  removeVote: (from: number, to: number) => void;
  selected: null | number;
  setAmountOfVotes: (playerId: number, votes: number) => void;
  setSelected: (playerId: number) => void;
  setVote: (from: number, to: number) => void;
}

const removingVote = (current: Player, from: number, to: number) => {
  if (current.id !== from) return current;

  if (current.firstVote === to) {
    return {
      ...current,
      firstVote: null,
    };
  }

  if (current.secondVote === to) {
    return {
      ...current,
      secondVote: null,
    };
  }

  return current;
};

const updateVotes = (current: Player, from: number, to: number) => {
  if (current.id !== from) return current;

  if (current.firstVote && current.secondVote) return current;

  if (!current.firstVote) {
    return {
      ...current,
      firstVote: to,
    };
  }

  return {
    ...current,
    secondVote: to,
  };
};

const updateAmountOfVotes = (currentPlayer: Player, playerId: number, votes: number) => {
  if (currentPlayer.id !== playerId) return currentPlayer;

  return {
    ...currentPlayer,
    votes,
  };
};

const usePlayersStore = create<PlayerState>((set) => ({
  players: PLAYERS,
  selected: null,
  removeVote: (from: number, to: number) =>
    set((state) => ({
      ...state,
      players: state.players.map((current) => removingVote(current, from, to)),
    })),
  setSelected: (playerId: number) =>
    set((state) => ({
      ...state,
      selected: state.selected === playerId ? null : playerId,
    })),
  setVote: (from: number, to: number) =>
    set((state) => ({
      ...state,
      players: state.players.map((current) => updateVotes(current, from, to)),
    })),
  setAmountOfVotes: (playerId: number, votes: number) =>
    set((state) => ({
      ...state,
      players: state.players.map((current) => updateAmountOfVotes(current, playerId, votes)),
    })),
}));

export default usePlayersStore;
