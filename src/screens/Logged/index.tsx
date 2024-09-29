import { Text, View, Image, Pressable } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '@hooks/useAuth'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { HelpCircle, LockKeyholeIcon } from 'lucide-react-native'

export function Logged() {

  const { user } = useAuth()

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <View className="flex-1 bg-primary justify-end items-start">
      <LinearGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]} style={{ flexGrow: 1, width: '100%' }}>
        <Image source={require('@assets/logo.png')} className='mt-32 w-32 h-4 ml-10' />
        <View className="justify-start flex-1 items-start gap-4 mt-32 px-10">
          <Image source={{ uri: user.avatar }} className='w-12 h-12 border border-zinc-200 rounded-full' />
          <Text className="text-zinc-100 text-left text-xl">
            Que bom ter ver por aqui, <Text className='font-bold'>{user.name}</Text>.
          </Text>
          <Pressable onPress={() => { }} className='mt-10'>
            <Text className="text-zinc-100 text-left text-sm">Entrar com outra conta</Text>
          </Pressable>
          <Pressable onPress={() => { }}>
            <Text className="text-zinc-100 text-left text-sm">Iniciar outro cadastro</Text>
          </Pressable>
          <View className="justify-center items-start gap-4 ">
            <Button
              onPress={() => navigation.navigate('home')}
              title="Entrar"
              className="w-24 mt-4 rounded-lg bg-secondary"
              textClassName="text-primary text-sm p-2"
              variant="outline"
            />
          </View>

        </View>
        <View className="flex flex-row justify-evenly pb-20 items-center gap-4">
          <View className='flex flex-col gap-2 items-center'>
            <LockKeyholeIcon color={'white'} />
            <Text className='text-white'>Token</Text>
          </View>
          <View className='flex flex-col gap-2 items-center'>
            <Image alt="pix" style={{ tintColor: 'white' }} source={require('@assets/icons/pix.png')} className='size-7' />
            <Text className='text-white'>Pix</Text>
          </View>
          <View className='flex flex-col gap-2 items-center'>
            <HelpCircle color={'white'} />
            <Text className='text-white'>Ajuda</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}
