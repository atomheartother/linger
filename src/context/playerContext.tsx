import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';
import {MusicInfo} from './songsContext';

type TrackPlayerData = {
  play: () => void;
  playSong: (song: MusicInfo) => void;
  addSongs: (song: MusicInfo[]) => Promise<void>;
};

export const TrackPlayerContext = createContext<TrackPlayerData | undefined>(
  undefined,
);

export const TrackPlayerContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await TrackPlayer.setupPlayer();
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [Capability.Play, Capability.Pause],
        compactCapabilities: [Capability.Play, Capability.Pause],
        progressUpdateEventInterval: 2,
      });
      setReady(true);
    };
    setup();
  }, []);

  const addSongs = useCallback(
    async (songs: MusicInfo[]) => {
      if (!ready) {
        return;
      }
      await TrackPlayer.reset();
      await TrackPlayer.add(
        songs.map(song => ({
          title: song.filename,
          url: song.uri,
          artist: 'unknown',
        })),
      );
    },
    [ready],
  );

  const play = useCallback(() => {
    if (!ready) {
      return;
    }
    TrackPlayer.play();
  }, [ready]);

  const playSong = useCallback(
    async (song: MusicInfo) => {
      await addSongs([song]);
      play();
    },
    [play, addSongs],
  );

  const data = useMemo(
    () => ({
      play,
      addSongs,
      playSong,
    }),
    [addSongs, playSong, play],
  );

  return (
    <TrackPlayerContext.Provider value={data}>
      {children}
    </TrackPlayerContext.Provider>
  );
};

export const useTrackPlayer = () => {
  const trackPlayer = useContext(TrackPlayerContext);
  if (!trackPlayer) {
    throw new Error(
      'useTrackPlayer needs to be used inside the TrackPlayer Context.',
    );
  }
  return trackPlayer;
};
