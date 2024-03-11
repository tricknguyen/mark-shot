interface Color {
	title: string,
	value: string
}

export interface Setting {
	backgroundColor: Color,
	padding: number,
	corner: number,
	shadow: any
}

interface Image {
	originalImage: any,
	backgroundImage: any,
	setting: Setting
}