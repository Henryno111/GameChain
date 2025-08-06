'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useMemo, useRef } from 'react';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Game {
  id: string;
  code: string;
  title: string;
  mode: 'onchain' | 'offline';
  questionCount: number;
  questions: Question[];
  createdAt: Date;
  isActive: boolean;
  players?: string[];
}

interface GameState {
  currentGame: Game | null;
  games: Game[];
  hostModalOpen: boolean;
  connectWalletModalOpen: boolean;
  selectedMode: 'onchain' | 'offline' | null;
}

type GameAction =
  | { type: 'SET_HOST_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_CONNECT_WALLET_MODAL_OPEN'; payload: boolean }
  | { type: 'SET_SELECTED_MODE'; payload: 'onchain' | 'offline' | null }
  | { type: 'CREATE_GAME'; payload: Omit<Game, 'id' | 'code' | 'createdAt' | 'isActive'> }
  | { type: 'LOAD_GAMES'; payload: Game[] }
  | { type: 'SET_CURRENT_GAME'; payload: Game | null }
  | { type: 'ADD_QUESTION'; payload: { gameId: string; question: Question } }
  | { type: 'UPDATE_QUESTION'; payload: { gameId: string; questionId: string; question: Partial<Question> } }
  | { type: 'DELETE_QUESTION'; payload: { gameId: string; questionId: string } }
  | { type: 'JOIN_GAME'; payload: { gameCode: string; playerId: string } };

const initialState: GameState = {
  currentGame: null,
  games: [],
  hostModalOpen: false,
  connectWalletModalOpen: false,
  selectedMode: null,
};

function generateGameCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'GC';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Simple localStorage helpers
const saveToStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }
};

const loadFromStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return null;
    }
  }
  return null;
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_HOST_MODAL_OPEN':
      return { ...state, hostModalOpen: action.payload };
    
    case 'SET_CONNECT_WALLET_MODAL_OPEN':
      return { ...state, connectWalletModalOpen: action.payload };
    
    case 'SET_SELECTED_MODE':
      return { ...state, selectedMode: action.payload };
    
    case 'CREATE_GAME': {
      const newGame: Game = {
        ...action.payload,
        id: `game_${Date.now()}`,
        code: generateGameCode(),
        createdAt: new Date(),
        isActive: true,
        players: [],
      };
      const newGames = [...state.games, newGame];
      
      // Save to localStorage immediately
      saveToStorage('gamechain-games', newGames);
      saveToStorage('gamechain-current-game', newGame);
      
      return {
        ...state,
        currentGame: newGame,
        games: newGames,
      };
    }
    
    case 'LOAD_GAMES':
      return {
        ...state,
        games: action.payload,
      };
    
    case 'SET_CURRENT_GAME':
      // Only save to localStorage if this isn't from initial load
      if (action.payload && !(action.payload as any).__fromLoad) {
        saveToStorage('gamechain-current-game', action.payload);
      }
      return { ...state, currentGame: action.payload };
    
    case 'ADD_QUESTION': {
      const updatedGames = state.games.map(game => 
        game.id === action.payload.gameId
          ? { ...game, questions: [...game.questions, action.payload.question] }
          : game
      );
      const newCurrentGame = state.currentGame?.id === action.payload.gameId
        ? { ...state.currentGame, questions: [...state.currentGame.questions, action.payload.question] }
        : state.currentGame;
        
      // Save to localStorage immediately
      saveToStorage('gamechain-games', updatedGames);
      saveToStorage('gamechain-current-game', newCurrentGame);
      
      return {
        ...state,
        games: updatedGames,
        currentGame: newCurrentGame,
      };
    }
    
    case 'UPDATE_QUESTION': {
      const updatedGames = state.games.map(game => 
        game.id === action.payload.gameId
          ? {
              ...game,
              questions: game.questions.map(q =>
                q.id === action.payload.questionId
                  ? { ...q, ...action.payload.question }
                  : q
              )
            }
          : game
      );
      const newCurrentGame = state.currentGame?.id === action.payload.gameId
        ? {
            ...state.currentGame,
            questions: state.currentGame.questions.map(q =>
              q.id === action.payload.questionId
                ? { ...q, ...action.payload.question }
                : q
            )
          }
        : state.currentGame;
      
      // Save to localStorage immediately
      saveToStorage('gamechain-games', updatedGames);
      saveToStorage('gamechain-current-game', newCurrentGame);
      
      return {
        ...state,
        games: updatedGames,
        currentGame: newCurrentGame,
      };
    }
    
    case 'DELETE_QUESTION': {
      const updatedGames = state.games.map(game => 
        game.id === action.payload.gameId
          ? { ...game, questions: game.questions.filter(q => q.id !== action.payload.questionId) }
          : game
      );
      const newCurrentGame = state.currentGame?.id === action.payload.gameId
        ? { ...state.currentGame, questions: state.currentGame.questions.filter(q => q.id !== action.payload.questionId) }
        : state.currentGame;
      
      // Save to localStorage immediately
      saveToStorage('gamechain-games', updatedGames);
      saveToStorage('gamechain-current-game', newCurrentGame);
      
      return {
        ...state,
        games: updatedGames,
        currentGame: newCurrentGame,
      };
    }
    
    case 'JOIN_GAME': {
      const gameToJoin = state.games.find(game => game.code === action.payload.gameCode);
      if (!gameToJoin) return state;
      
      const updatedGame = {
        ...gameToJoin,
        players: [...(gameToJoin.players || []), action.payload.playerId]
      };
      
      const updatedGames = state.games.map(game => 
        game.code === action.payload.gameCode ? updatedGame : game
      );
      
      // Save to localStorage immediately
      saveToStorage('gamechain-games', updatedGames);
      saveToStorage('gamechain-current-game', updatedGame);
      
      return {
        ...state,
        games: updatedGames,
        currentGame: updatedGame,
      };
    }
    
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const initialized = useRef(false);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  // Load initial data ONCE on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const savedGames = loadFromStorage('gamechain-games');
    const savedCurrentGame = loadFromStorage('gamechain-current-game');

    if (savedGames) {
      const games: Game[] = savedGames.map((game: any) => ({
        ...game,
        createdAt: new Date(game.createdAt),
      }));
      dispatch({ type: 'LOAD_GAMES', payload: games });
    }

    if (savedCurrentGame) {
      const currentGame: Game = {
        ...savedCurrentGame,
        createdAt: new Date(savedCurrentGame.createdAt),
        __fromLoad: true // Flag to prevent saving back to localStorage
      } as any;
      dispatch({ type: 'SET_CURRENT_GAME', payload: currentGame });
    }
  }, []); // Empty deps - runs only once!

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export function useGameActions() {
  const { dispatch } = useGame();

  return useMemo(() => ({
    openHostModal: () => dispatch({ type: 'SET_HOST_MODAL_OPEN', payload: true }),
    closeHostModal: () => dispatch({ type: 'SET_HOST_MODAL_OPEN', payload: false }),
    openConnectWalletModal: () => dispatch({ type: 'SET_CONNECT_WALLET_MODAL_OPEN', payload: true }),
    closeConnectWalletModal: () => dispatch({ type: 'SET_CONNECT_WALLET_MODAL_OPEN', payload: false }),
    setSelectedMode: (mode: 'onchain' | 'offline' | null) => 
      dispatch({ type: 'SET_SELECTED_MODE', payload: mode }),
    createGame: (gameData: Omit<Game, 'id' | 'code' | 'createdAt' | 'isActive'>) =>
      dispatch({ type: 'CREATE_GAME', payload: gameData }),
    setCurrentGame: (game: Game | null) =>
      dispatch({ type: 'SET_CURRENT_GAME', payload: game }),
    addQuestion: (gameId: string, question: Question) =>
      dispatch({ type: 'ADD_QUESTION', payload: { gameId, question } }),
    updateQuestion: (gameId: string, questionId: string, question: Partial<Question>) =>
      dispatch({ type: 'UPDATE_QUESTION', payload: { gameId, questionId, question } }),
    deleteQuestion: (gameId: string, questionId: string) =>
      dispatch({ type: 'DELETE_QUESTION', payload: { gameId, questionId } }),
    joinGame: (gameCode: string, playerId: string) =>
      dispatch({ type: 'JOIN_GAME', payload: { gameCode, playerId } }),
  }), [dispatch]);
}