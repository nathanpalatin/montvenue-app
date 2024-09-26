import { Button as ButtonNativeBase, IButtonProps } from 'native-base'

type Props = IButtonProps & {
  onSend?: (text: string) => void
}

export function ButtonMessage({ children, variant, ...rest }: Props) {
  return (
    <ButtonNativeBase
      bg={variant === 'outline' ? 'gray.800' : 'lime.700'}
      w={'8'}
      rounded={'full'}
      h={'8'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor={variant === 'outline' ? 'lime.900' : 'none'}
      _pressed={{
        bg: variant === 'outline' ? 'gray.800' : 'lime.800',
      }}
      {...rest}
    >
      {children}
    </ButtonNativeBase>
  )
}