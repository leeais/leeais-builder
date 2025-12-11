import Config from 'react-native-config';

type EnvConfigType = {
  apiUrl: string;
};

export const envConfig: EnvConfigType = {
  apiUrl: Config.API_URL as string,
};
