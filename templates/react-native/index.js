import '@/global.css';
import '@i18n/index.ts';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from '@/App';

AppRegistry.registerComponent(appName, () => App);
