import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { increment } from '@features/counter/counterSlice';
import { useTranslation } from 'react-i18next';
import { envConfig } from '@shared/constants/config';

type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export default function HomeScreen() {
  const navigation = useNavigation<RootStackNavigationProps>();
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => axios(envConfig.apiUrl).then((res) => res.data),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const { t, i18n } = useTranslation();

  const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

  if (isPending) return <Text>Loading...</Text>;

  if (error) return <Text>An error has occurred: {error.message}</Text>;
  return (
    <View className="flex-1 items-center justify-center">
      <Text>{t('welcome')}</Text>
      <Text>{t('greeting', { name: 'Long' })}</Text>
      <TouchableOpacity
        onPress={() =>
          i18n.language === 'en' ? i18n.changeLanguage('vi') : i18n.changeLanguage('en')
        }
      >
        <Text>{t('button_text')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text>Go to Settings screen</Text>
      </TouchableOpacity>

      <View className="mt-4">
        <Text>Counter: {count}</Text>
        <TouchableOpacity onPress={() => dispatch(increment())}>
          <Text>Increment</Text>
        </TouchableOpacity>
      </View>

      <View className="p-4 gap-2">
        <Text>{data.name}</Text>
        <Text>{data.description}</Text>
        <Text>👀 {data.subscribers_count}</Text>
        <Text>✨ {data.stargazers_count}</Text>
        <Text>🍴 {data.forks_count}</Text>
      </View>

      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="First name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstName"
        />
        {errors.firstName && <Text>{errors.firstName.message}</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Last name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastName"
        />
        {errors.lastName && <Text>{errors.lastName.message}</Text>}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
