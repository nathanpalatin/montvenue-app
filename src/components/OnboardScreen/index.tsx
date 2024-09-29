import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'

import { LinearGradient } from 'expo-linear-gradient'

interface ScreenProps {
  item: {
    id: number
    title: string
    description: string
    image: string
  }
  index: number
  scrollX: SharedValue<number>
}

const { width } = Dimensions.get('screen')

export function OnboardScreen({ item, index, scrollX }: ScreenProps) {

  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 1, 0, width * 0.25],
            Extrapolation.CLAMP
          )
        }
      ],
    }
  })

  return (
    <Animated.View style={[styles.item, rnAnimatedStyle]}>
      <ImageBackground source={item.image}>
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.6)"]} style={{ flexGrow: 1, width: width }}>
          <View className='flex-1 justify-center px-10'>
            <Text className='text-white text-left text-2xl'>{item.title}</Text>
            <Text className='text-white text-left text-6xl font-semibold'>{item.description}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})