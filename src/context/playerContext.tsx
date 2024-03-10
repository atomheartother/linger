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
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import {MusicInfo} from './songsContext';

type PlayingData = {
  song: MusicInfo;
  // If a playlist is currently playing, this is set to the id
  // Otherwise it's set to -1
  playlistId: number;
};

export type TrackPlayerData = {
  playSong: (song: MusicInfo) => void;
  addSongs: (song: MusicInfo[]) => Promise<void>;
  playing: PlayingData | null;
  repeatMode: RepeatMode;
  changeRepeatMode: (rm: RepeatMode) => void;
};

export const TrackPlayerContext = createContext<TrackPlayerData | undefined>(
  undefined,
);

const events = [Event.PlaybackActiveTrackChanged];

export const TrackPlayerContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState<TrackPlayerData['playing']>(null);
  const [repeatMode, setRepeatMode] = useState(RepeatMode.Queue);

  const changeRepeatMode = useCallback((rm: RepeatMode) => {
    setRepeatMode(rm);
  }, []);

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

  useTrackPlayerEvents(events, event => {
    switch (event.type) {
      case Event.PlaybackActiveTrackChanged: {
        const {lastTrack} = event;
        if (!lastTrack) {
          setPlaying(null);
        } else if (!playing) {
          setPlaying({
            song: {uri: lastTrack.url, filename: lastTrack.title || 'unknown'},
            playlistId: -1,
          });
        } else {
          setPlaying({
            ...playing,
            song: {uri: lastTrack.url, filename: lastTrack.title || 'unknown'},
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
      playing,
      repeatMode,
      changeRepeatMode,
    }),
    [addSongs, playSong, playing, repeatMode, changeRepeatMode],
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
