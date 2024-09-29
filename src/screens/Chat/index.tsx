import { useEffect, useRef, useState } from 'react'
import { ScrollView as ScrollTypes, Keyboard, TextInput, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

import { useSocket } from '@contexts/socket'
import { formatDate } from '@utils/handleDate'

import { ScreenHeader } from '@components/ScreenHeader'

export function Chat() {
  const { sendMessage, messageList, getUserOnline, currentChat, userId, clearChat } = useSocket()

  const [message, setMessage] = useState<string>('')
  const [isOnline, setIsOnline] = useState<boolean>(false)

  const navigation = useNavigation()

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
    return null
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#111111', paddingBottom: 10 }}>
      <ScreenHeader
        handlePressOption={() => {
          navigation.goBack()
        }}
        secondOption
        online={isOnline}
        avatar={'https://github.com/ismaeleliper.png'}
        title={'Ismael Eliper'}
      />
      <ScrollTypes
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current && scrollViewRef.current.scrollToEnd({ animated: true })}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', paddingHorizontal: 16, marginVertical: 8 }}
      >
        {messageList.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: item.userId === userId ? 'flex-end' : 'flex-start',
              marginBottom: 8,
            }}
          >
            <View
              style={{
                backgroundColor: item.userId === userId ? '#84cc16' : '#9ca3af',
                padding: 8,
                borderRadius: 4,
                minWidth: '20%',
              }}
            >
              <Text style={{ color: '#e5e7eb', marginBottom: 8, fontSize: 14 }}>{item.messageText}</Text>
              <Text
                style={{
                  color: '#9ca3af',
                  position: 'absolute',
                  bottom: 4,
                  right: 8,
                  fontSize: 10,
                  opacity: 0.4,
                }}
              >
                {formatDate(item.messageDate)}
                {item.userId === userId && (
                  <MaterialIcons name="check" size={14} color={'#d1d5db'} />
                )}
              </Text>
            </View>
          </View>
        ))}
      </ScrollTypes>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16 }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: '#374151',
            color: '#d1d5db',
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 8,
            marginRight: 8,
          }}
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Envie uma mensagem..."
          placeholderTextColor="#9ca3af"
          onSubmitEditing={() => handleMessage(message)}
        />
        {message.length > 0 && (
          <TouchableOpacity onPress={() => handleMessage(message)}>
            <MaterialIcons name="send" size={24} color="#d1d5db" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
