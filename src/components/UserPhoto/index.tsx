import { Image, ImageProps } from 'react-native'

type Props = ImageProps & {
	size: number
}

export function UserPhoto({ size, ...rest }: Props) {
	return (
		<Image
			w={size}
			h={size}
			alt=""
			rounded={'full'}
			borderColor={'gray.400'}
			{...rest}
		/>
	)
}
