import { Skeleton } from '@components/Loading'
import { feed } from '@dtos/FeedDTO'
import { View, Image, Text } from 'react-native'
import Video from 'react-native-video'

import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const FeedItem = ({
  item,
  loading,
  isMuted
}: { item: feed; loading: boolean, isMuted: boolean }) => {


  if (loading) {
    return (
      <View className="flex justify-center items-center w-full h-80">
        <Skeleton />
      </View>
    )
  }

  return (
    <View className="w-full space-y-2">
      {item.medias[0].type === 'POST' ? (
        <Image source={{ uri: item.medias[0].source }} className="w-full z-50 h-[300px] object-cover" />
      ) : (
        <Video
          source={{ uri: item.medias[0].source }}
          style={{ width: '100%', height: 600 }}
          muted={isMuted}
        />
      )}

      <Text className="text-sm text-white"><Text className='font-bold'>{item.user.username}</Text> {item.content}</Text>
      <Text className="text-sm text-white"> {dayjs(item.createdAt).fromNow()}</Text>
    </View>
  );
};
