import type {NavigatorScreenParams} from '@react-navigation/native';

export type PlaylistRouteParams = {
  AllPlaylists: undefined;
  PlaylistView: {id: number};
};

export type RootBottomTabsParams = {
  Home: undefined;
  Playlists: NavigatorScreenParams<PlaylistRouteParams>;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootBottomTabsParams {}
  }
}
