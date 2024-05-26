import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
  useTrackPlayerEvents,
  State,
} from 'react-native-track-player';
import {MusicInfo} from './songsContext';
import {useStats} from './stats';
import storage from '../utils/storage';

export type TrackPlayerData = {
  playSong: (song: MusicInfo) => void;
  addSongs: (song: MusicInfo[]) => Promise<void>;
  repeatMode: RepeatMode;
  changeRepeatMode: (rm: RepeatMode) => void;
  sleepDate: Date | null;
  setSleepDate: (date: Date | null) => void;
};

const events = [Event.PlaybackState, Event.PlaybackProgressUpdated];

export const TrackPlayerContext = createContext<TrackPlayerData | undefined>(
  undefined,
);

export const TrackPlayerContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [ready, setReady] = useState(false);
  const [sleepDate, setSleepDate] = useState<Date | null>(null);
  const [repeatMode, setRepeatMode] = useState(RepeatMode.Queue);
  const {registerSongPlay} = useStats();
  // For stats purposes
  const [newSongLoaded, setNewSongLoaded] = useState(false);
  const sleepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changeRepeatMode = useCallback((rm: RepeatMode) => {
    setRepeatMode(rm);
  }, []);

  // Fetch sleep date from storage
  useEffect(() => {
    const storedSleep = storage.getNumber('sleepTimerDate') || null;
    if (!storedSleep) {
      return;
    }
    if (storedSleep < Date.now()) {
      // If stored sleep was yesterday, remove it.
      storage.delete('sleepTimerDate');
      return;
    }
    setSleepDate(new Date(storedSleep));
  }, []);

  useEffect(() => {
    if (sleepTimeoutRef.current) {
      clearTimeout(sleepTimeoutRef.current);
      sleepTimeoutRef.current = null;
    }
    if (!sleepDate) {
      storage.delete('sleepTimerDate');
      return;
    }
    const diff = sleepDate.getTime() - Date.now();
    if (diff < 0) {
      setSleepDate(null);
      storage.delete('sleepTimerDate');
      return;
    }
    storage.set('sleepTimerDate', sleepDate.getTime());
    sleepTimeoutRef.current = setTimeout(() => {
      setSleepDate(null);
      TrackPlayer.stop();
    }, diff);
  }, [sleepDate]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    TrackPlayer.setRepeatMode(repeatMode);
  }, [repeatMode, ready]);

  useEffect(() => {
    const setup = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        progressUpdateEventInterval: 2,
      });
      setReady(true);
    };
    setup();
  }, []);

  useTrackPlayerEvents(events, e => {
    switch (e.type) {
      case Event.PlaybackState: {
        if (e.state === State.Loading) {
          // prepare the player to received a new track info
          setNewSongLoaded(true);
        }
        break;
      }
      case Event.PlaybackProgressUpdated: {
        if (newSongLoaded) {
          // Process track info and stop processing further tracks
          setNewSongLoaded(false);
          TrackPlayer.getQueue().then(queue => {
            registerSongPlay(queue[e.track].url);
          });
        }
      }
    }
  });

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

  const playSong = useCallback(
    async (song: MusicInfo) => {
      await addSongs([song]);
      TrackPlayer.play();
    },
    [addSongs],
  );

  const data = useMemo(
    () => ({
      addSongs,
      playSong,
      repeatMode,
      changeRepeatMode,
      sleepDate,
      setSleepDate,
    }),
    [addSongs, playSong, repeatMode, changeRepeatMode, sleepDate, setSleepDate],
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
