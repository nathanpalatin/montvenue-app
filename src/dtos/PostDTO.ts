import { feed } from './FeedDTO'

export interface PostProps {
	item: feed
	isMuted: boolean
	video?: boolean
	liked: boolean
	loading: boolean
	comments: number
}
