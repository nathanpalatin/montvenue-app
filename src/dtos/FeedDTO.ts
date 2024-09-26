export interface feed {
	id: string
	title: string
	content: string
	userId: string
	createdAt: string
	medias: {
		id: string
		source: string
		createdAt: string
		type: string
		content: string
	}[]
	user: {
		id: string
		name: string
		username: string
		avatar: string
	}
}
