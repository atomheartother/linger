import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Dirs, FileSystem} from 'react-native-file-access';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  State,
} from 'react-native-track-player';

type TrackPlayerData = {
  addSong: (name: string, uri: string) => void;
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
    async (name: string, path: string) => {
      if (!ready) {
        return;
      }
      const exists = await FileSystem.exists(path);
      if (!exists) {
        console.error(`${path} does not exist`);
        return;
      }
      await TrackPlayer.add({
        title: name,
        url: path,
        artist: 'unknown',
      });
      TrackPlayer.play();
    },
    [ready],
  );

  useEffect(() => {
    const checkState = async () => {
      const pbState = await TrackPlayer.getPlaybackState();
      if (pbState.state === State.Error) {
        console.error(pbState.error);
        TrackPlayer.reset();
      }
    };
    if (!ready) {
      console.log('Player is not ready.');
      return;
    }
    const intervalId = setInterval(checkState, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [ready]);

  const data = useMemo(
    () => ({
      addSong,
    }),
    [addSong],
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
