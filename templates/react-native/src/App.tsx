import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppNavigator from '@navigation/AppNavigator';
import store from '@store/index';

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <AppContent />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}

function AppContent() {
  return <AppNavigator />;
}

export default App;
