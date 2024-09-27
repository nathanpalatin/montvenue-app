import { useEffect, useState } from 'react'
import { ImageBackground, Text, View, Image, Pressable } from 'react-native'


import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import homebg1 from '@assets/welcome-splash.png'
import homebg2 from '@assets/welcome-splash-2.png'
import homebg3 from '@assets/welcome-splash-3.png'

export function Welcome() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const backgroudImages = [homebg1, homebg2, homebg3]
  const [imageBackground, setImageBackground] = useState()

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      const newBackgroundImage = backgroudImages[index]
      setImageBackground(newBackgroundImage)
      index = (index + 1) % backgroudImages.length
    }, 5000)

    return () => clearInterval(interval)
  }, [])



  return (
    <ImageBackground
      source={imageBackground}
      defaultSource={homebg1}
      className="flex-1 justify-end items-start"
    >
      <View className="justify-center items-start gap-6 my-[200px] px-10">
        <Image source={require('@assets/logo.png')} className='w-32 h-4' />


        <Text className="text-zinc-100 text-left text-5xl font-bold ">
          Invista de {'\n'}forma simples {'\n'}e inteligente
        </Text>
      </View>

      <View className="w-full items-center px-10 pb-10">
        <Button
          onPress={() => navigation.navigate('signUp')}
          title="Criar nova conta"
          variant="outline"
        />
        <Pressable
          onPress={() => navigation.navigate('signIn')}
        >
          <Text className="text-secondary text-lg text-center mt-4 font-semibold mb-6">
            Já tem conta? Entrar
          </Text>

        </Pressable>

      </View>

    </ImageBackground>
  )
}
