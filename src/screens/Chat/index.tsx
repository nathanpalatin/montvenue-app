import React, { useEffect, useRef, useState } from 'react'
import { ScrollView as ScrollTypes, Keyboard } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

import { useSocket } from '@contexts/socket'
import { formatDate } from '@utils/handleDate'

import { MaterialIcons } from '@expo/vector-icons'

import { Box, theme, ScrollView, Text, KeyboardAvoidingView, Icon, CheckIcon } from 'native-base'

import { InputChat } from '@components/InputChat'
import { ScreenHeader } from '@components/ScreenHeader'
import { ButtonMessage } from '@components/ButtonMessage'

export function Chat() {
  const { sendMessage, messageList, getUserOnline, currentChat, userId, clearChat } = useSocket()

  const [message, setMessage] = useState<string>('')
  const [isOnline, setIsOnline] = useState<boolean>(false)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const scrollViewRef = useRef<ScrollTypes>(null)

  const handleMessage = (text: string) => {
    sendMessage(text)
    setMessage('')
  }

  const getOnline = async () => {
    if (currentChat) {
      const res = await getUserOnline(currentChat.userId)
      setIsOnline(res.online)
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current && scrollViewRef.current.scrollToEnd({ animated: true })
    })

    return () => {
      keyboardDidShowListener?.remove()
    }
  }, [])

  useEffect(() => {
    getOnline()
  }, [currentChat])

  if (!currentChat) {
    return
  }

  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1, backgroundColor: '#111111' }} keyboardVerticalOffset={-24}>
      <ScreenHeader
        handlePressOption={() => {
          navigation.pop()
        }}
        secondOption
        online={isOnline}
        avatar={'https://github.com/ismaeleliper.png'}
        title={'Ismael Eliper'}
      />
      <ScrollView
        onContentSizeChange={() => scrollViewRef.current && scrollViewRef.current.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        px={4}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        my={2}
      >
        {messageList.map((item, index) => (
          <Box flexDirection={'row'} key={index} justifyContent={item.userId === userId ? 'flex-end' : 'flex-start'}>
            <Box bg={item.userId === userId ? 'lime.700' : 'gray.400'} mb={'1'} rounded={'sm'} minWidth={'20'} p={'2'}>
              <Text color={theme.colors.gray[200]} fontFamily={'body'} fontSize={'sm'} mb={2} textAlign={'left'}>
                {item.messageText}
              </Text>
              <Text color={theme.colors.gray[300]} ml={12} textAlign={'right'} position={'absolute'} opacity={0.4} bottom={1} w={'10'} right={2} fontFamily={'mono'} fontSize={'2xs'}>
                {formatDate(item.messageDate)}
                {item.userId === userId && <CheckIcon size={2.5} color={theme.colors.gray[400]} />}
              </Text>
            </Box>
          </Box>
        ))}
      </ScrollView>

      <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mt={1} mb={10} mx={4}>
        <InputChat value={message} onChangeText={text => setMessage(text)} onSubmitEditing={() => handleMessage(message)} />
        {message.length > 0 && (
          <ButtonMessage onPress={() => handleMessage(message)}>
            <Icon as={MaterialIcons} name="send" color={'gray.100'} size="4" />
          </ButtonMessage>
        )}
      </Box>
    </KeyboardAvoidingView>
  )
}