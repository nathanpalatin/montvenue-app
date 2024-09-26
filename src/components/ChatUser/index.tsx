import { TouchableOpacity, TouchableOpacityProps, Text, View } from 'react-native'
import { HStack, Heading, Icon, Image, VStack } from 'native-base'

import { Entypo } from '@expo/vector-icons'


import defaultYUserPhotoImg from '@assets/userPhotoDefault.png'

type Props = TouchableOpacityProps & {
	name: string
	image: string
	username: string
}

export function ChatUser({ name, username, image, ...rest }: Props) {

	return (
		<TouchableOpacity {...rest}>
			<HStack
				bg={'gray.800'}
				p={'4'}
				alignItems={'center'}
				pr={'4'}
				borderBottomWidth={0.3}
			>
				<Image
					source={
						image ? { uri: image, cache: 'force-cache' } : defaultYUserPhotoImg
					}
					w={10}
					h={10}
					rounded={'full'}
					alt={'User profile'}
					mr={'3'}
					ml={'2'}
					resizeMode={'cover'}
				/>

				<VStack flex={1}>
					<Heading fontSize={'sm'} color={'white'}>
						{name}
					</Heading>
					<Heading fontSize={'xs'} color={'gray.300'}>
						@{username}
					</Heading>
				</VStack>
				<View className='bg-red-700 mr-2 rounded-full'>
					<Text className='text-xs font-bold text-white text-center p-2'>1</Text>
				</View>

				<Icon as={Entypo} name="chevron-thin-right" color={'gray.300'} />
			</HStack>
		</TouchableOpacity>
	)
}
