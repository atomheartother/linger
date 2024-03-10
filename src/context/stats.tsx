import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export type PlaylistSong = {
  uri: string;
  weight: number;
};

type PlayStat = {
  playCount: number;
};

type StatsData = {
  lastUri: string;
  playStats: {[key: string]: PlayStat};
  registerSongPlay: (uri: string) => void;
};

export const StatsContext = createContext<StatsData | undefined>(undefined);

// Helper function
export const StatsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [lastUri, setLastUri] = useState('');
  const [playStats, setPlayStats] = useState<StatsData['playStats']>({});
  useEffect(() => {
    const stored = JSON.parse(storage.getString('playStats') || '{}');
    setPlayStats(stored);
  }, []);
  useEffect(() => {
    // Save playlists to storage on change
    storage.set('playStats', JSON.stringify(playStats));
  }, [playStats]);

  const registerSongPlay = useCallback(
    (uri: string) => {
      const existingItem = playStats[uri];
      setLastUri(uri);
      if (!existingItem) {
        setPlayStats({...playStats, [uri]: {playCount: 1}});
      } else {
        setPlayStats({
          ...playStats,
          [uri]: {...existingItem, playCount: existingItem.playCount + 1},
        });
      }
    },
    [playStats],
  );

  const playlistData = useMemo(
    () => ({
      lastUri,
      playStats,
      registerSongPlay,
    }),
    [lastUri, playStats, registerSongPlay],
  );

  return (
    <StatsContext.Provider value={playlistData}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const songs = useContext(StatsContext);
  if (!songs) {
    throw new Error('useStats needs to be used inside the Songs Context.');
  }
  return songs;
};
