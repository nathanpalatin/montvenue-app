/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import { ScreenHeader } from '@components/ScreenHeader'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { CheckCircle } from 'lucide-react-native'
import { ScrollView } from 'native-base'
import { View, Text, ImageBackground } from 'react-native'

export default function Pricing() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  return (
    <>
      <ScreenHeader
        title="Planos"
        handlePressOption={() => navigation.pop()}
      />
      <ImageBackground
        defaultSource={require('@assets/background-secondary.png')}
        className="flex-1 justify-center absolute w-full"
      >
        <View className="bg-black/40 absolute h-screen w-screen" />

        <View className="px-4 ">
          <ScrollView
            className="h-screen mb-20"
            showsVerticalScrollIndicator={false}
          >

            <View className="mt-[350px]  p-5 ">
              <View className="flex flex-row items-center mb-4 gap-4">
                <Text className="text-white text-xl font-bold">Premium</Text>
                <View className="rounded-full px-2 py-1 bg-yellow-700 border border-yellow-500">
                  <Text className="text-yellow-300 text-xs">Popular</Text>
                </View>
              </View>
              <Text className="text-zinc-200">
                Enhance your investment strategy with advanced analytics and
                detailed token insights, designed to elevate your trading
                experience.
              </Text>

              <Text className="text-red-700  line-through mt-4">$2999.99</Text>
              <Text className="text-white text-2xl font-bold mt-4">
                $166.67/mo
              </Text>
              <Text className="text-zinc-300 text-lg  mt-4">
                $1,999.99/yr (2 months free)
              </Text>
              <View className="mt-4 bg-yellow-500 rounded-xl">
                <Text className="text-zinc-800 font-semibold p-4 text-md text-center">
                  Free Trial
                </Text>
              </View>
              <Text className="text-zinc-400 text-xs mt-4">
                Includes everything in "Basic", plus:
              </Text>
              <View className="flex flex-row items-center mb-2 mt-3 gap-2">
                <CheckCircle color={'green'} size={20} />
                <Text className="text-zinc-50 text-sm smt-4">
                  AI Crypto Trading Signals and Alerts
                </Text>
              </View>
              <View className="flex flex-row items-center mb-2 gap-2">
                <CheckCircle color={'green'} size={20} />
                <Text className="text-zinc-50 text-sm smt-4">
                  Research Reports: Hidden Gems, Code Reviews
                </Text>
              </View>
              <View className="flex flex-row items-center mb-2 gap-2">
                <CheckCircle color={'green'} size={20} />
                <Text className="text-zinc-50 text-sm smt-4">
                  AI Crypto Indices
                </Text>
              </View>
              <View className="flex flex-row items-center mb-2 gap-2">
                <CheckCircle color={'green'} size={20} />
                <Text className="text-zinc-50 text-sm smt-4">
                  7 Day Crypto Price Predictions
                </Text>
              </View>
              <View className="flex flex-row items-center mb-2 gap-2">
                <CheckCircle color={'green'} size={20} />
                <Text className="text-zinc-50 text-sm smt-4">
                  Advanced Telegram Group
                </Text>
              </View>
            </View>
            <View className=" mb-40 rounded-xl p-5  mt-10">
              <View className="flex flex-row items-center mb-4 gap-4">
                <Text className="text-white text-xl font-bold">VIP</Text>
                <View className="rounded-full px-2 py-1 bg-yellow-700 border border-yellow-500">
                  <Text className="text-yellow-300 text-xs">Only Yearly</Text>
                </View>
              </View>

              <Text className="text-zinc-200">
                Access elite investment opportunities and expert-curated deals,
                connecting you with the forefront of crypto innovation and
                networking.
              </Text>

              <Text className="text-red-700  line-through mt-4">$9,999.99</Text>
              <Text className="text-white text-2xl font-bold mt-4">
                $624.99/mo
              </Text>
              <Text className="text-zinc-300 text-lg  mt-4">
                $7,499.99/yr (you save $2,500!)
              </Text>
              <View className="mt-4 bg-yellow-500 rounded-xl">
                <Text className="text-zinc-800 font-semibold p-4 text-md text-center">
                  Free Trial
                </Text>
              </View>
              <Text className="text-zinc-400 text-xs mt-4">
                Includes everything in "Basic", plus:
              </Text>
              <View className=" mt-4 flex flex-row items-center mb-2 gap-2">
                <CheckCircle color={'green'} size={20} />
                <Text className="text-zinc-50 text-sm smt-4">
                  Access to all Token Metrics Ventures Sourced Deals
                </Text>
              </View>
              <View className="flex flex-row items-center mb-2 gap-2">
                <CheckCircle color={'green'} size={20} />
                <Text className="text-zinc-50 text-sm smt-4">
                  Handpicked and Curated VIP Deals
                </Text>
              </View>
              <View className="flex flex-row items-center mb-2 gap-2">
                <CheckCircle color={'green'} size={20} />
                <Text className="text-zinc-50 text-sm smt-4">
                  VIP Telegram Group
                </Text>
              </View>

            </View>
          </ScrollView>

        </View>
      </ImageBackground>

    </>
  )
}
