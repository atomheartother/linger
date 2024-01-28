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
  playSong: (song: MusicInfo) => void;
  addSong: (song: MusicInfo) => void;
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

  const addSong = useCallback(
    async (song: MusicInfo) => {
      if (!ready) {
        return;
      }
      await TrackPlayer.add({
        title: song.filename,
        url: song.path,
        artist: 'unknown',
      });
    },
    [ready],
  );

  const playSong = useCallback(
    async (song: MusicInfo) => {
      if (!ready) {
        return;
      }
      await TrackPlayer.reset();
      await addSong(song);
      TrackPlayer.play();
    },
    [ready, addSong],
  );

  const data = useMemo(
    () => ({
      addSong,
      playSong,
    }),
    [addSong, playSong],
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
