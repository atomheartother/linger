import type {NavigatorScreenParams} from '@react-navigation/native';

export type PlaylistRouteParams = {
  AllPlaylists: undefined;
  PlaylistView: {id: number};
};

export type BottomTabsParams = {
  Home: undefined;
  Playlists: NavigatorScreenParams<PlaylistRouteParams>;
  Settings: undefined;
};

export type RootStackParams = {
  Main: NavigatorScreenParams<BottomTabsParams>;
  Player: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}
