import { feed } from '@dtos/FeedDTO'
import { getFeed } from '@services/serviceFeed'
import { create } from 'zustand'

type FeedData = {
	feedList: feed[]
	loadingFeed: boolean
	initializeFeed: () => void
	incrementFeed: (post: feed) => void
}

const useFeed = create<FeedData>(set => ({
	feedList: [],
	loadingFeed: true,
	initializeFeed: async () => {
		try {
			set({ loadingFeed: true })

			const response = await getFeed()
			const feedData = response.data.posts
			set({
				feedList: feedData,
				loadingFeed: false
			})
		} catch (error) {
			console.warn('InitializeFeed - Feed(Zustand)')
			console.log(error)
		} finally {
			set({
				loadingFeed: false
			})
		}
	},

	incrementFeed: (post: feed) => {
		set(prev => ({ feedList: [post, ...prev.feedList] }))
	}
}))

export default useFeed
