export {};

declare global {
  type MainTabsParamList = {
    Home: undefined;
    Profile: undefined;
  };

  type RootStackParamList = {
    MainTabs: NavigatorScreenParams<MainTabsParamList>;
    Settings: undefined;
  };

  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}
