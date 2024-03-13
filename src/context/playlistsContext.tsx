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

export type Playlist = {
  id: number;
  name: string;
  songs: PlaylistSong[];
};

type PlaylistsData = {
  playlists: Playlist[];
  createPlaylist: (p: Omit<Playlist, 'id'>) => Playlist;
  deletePlaylist: (id: number) => void;
  renamePlaylist: (id: number, name: string) => void;
  addToPlaylist: (id: number, url: string[]) => void;
  editWeight: (id: number, url: string, weight: number) => void;
  removeFromPlaylist: (id: number, urls: string[]) => void;
};

export const PlaylistsContext = createContext<PlaylistsData | undefined>(
  undefined,
);

// Helper function
const updatedPlaylists = (
  playlists: Playlist[],
  id: number,
  callback: (p: Playlist) => Playlist,
) => {
  const newPlaylists = [...playlists];
  const idx = playlists.findIndex(p => p.id === id);
  if (idx < 0) {
    throw new Error(`There's no playlist with id ${id}`);
  }
  newPlaylists.splice(idx, 1, callback(playlists[idx]));
  return newPlaylists;
};

export const PlaylistsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [highestId, setHighestId] = useState(0);
  useEffect(() => {
    // Load playlists from storage on boot
    const stored = JSON.parse(storage.getString('playlists') || '[]');
    const id = storage.getNumber('playlistHighestId') || 0;
    setPlaylists(stored);
    setHighestId(id);
  }, []);
  useEffect(() => {
    // Save playlists to storage on change
    storage.set('playlists', JSON.stringify(playlists));
  }, [playlists]);
  useEffect(() => {
    // Persist highest id changes
    storage.set('playlistHighestId', highestId);
  }, [highestId]);

  const createPlaylist: PlaylistsData['createPlaylist'] = useCallback(
    p => {
      const newPlaylist: Playlist = {id: highestId, ...p};
      setPlaylists([...playlists, newPlaylist]);
      setHighestId(highestId + 1);
      return newPlaylist;
    },
    [playlists, highestId],
  );

  const deletePlaylist: PlaylistsData['deletePlaylist'] = useCallback(
    target => {
      setPlaylists(playlists.filter(({id}) => id !== target));
    },
    [playlists],
  );

  const renamePlaylist: PlaylistsData['renamePlaylist'] = useCallback(
    (id, name) => {
      setPlaylists(updatedPlaylists(playlists, id, p => ({...p, name})));
    },
    [playlists],
  );

  const addToPlaylist: PlaylistsData['addToPlaylist'] = useCallback(
    (id, uri) => {
      setPlaylists(
        updatedPlaylists(playlists, id, p => ({
          ...p,
          songs: [
            ...p.songs,
            ...uri
              .filter(u => !p.songs.find(s => s.uri === u))
              .map(u => ({uri: u, weight: 1})),
          ],
        })),
      );
    },
    [playlists],
  );

  const removeFromPlaylist: PlaylistsData['removeFromPlaylist'] = useCallback(
    (id, urls) => {
      const toRemove = new Set(urls);
      setPlaylists(
        updatedPlaylists(playlists, id, p => ({
          ...p,
          songs: p.songs.filter(s => !toRemove.has(s.uri)),
        })),
      );
    },
    [playlists],
  );
  const editWeight: PlaylistsData['editWeight'] = useCallback(
    (id, uri, weight) => {
      setPlaylists(
        updatedPlaylists(playlists, id, p => ({
          ...p,
          songs: p.songs.map(s => {
            if (s.uri === uri) {
              return {...s, weight};
            }
            return s;
          }),
        })),
      );
    },
    [playlists],
  );

  const playlistData = useMemo(
    () => ({
      playlists,
      createPlaylist,
      deletePlaylist,
      renamePlaylist,
      addToPlaylist,
      removeFromPlaylist,
      editWeight,
    }),
    [
      playlists,
      createPlaylist,
      deletePlaylist,
      renamePlaylist,
      addToPlaylist,
      removeFromPlaylist,
      editWeight,
    ],
  );

  return (
    <PlaylistsContext.Provider value={playlistData}>
      {children}
    </PlaylistsContext.Provider>
  );
};

export const usePlaylists = () => {
  const songs = useContext(PlaylistsContext);
  if (!songs) {
    throw new Error('usePlaylists needs to be used inside the Songs Context.');
  }
  return songs;
};
