export default class Place {
	constructor(
		public id: string,
		public title: string,
		public imageUri: string
	) {
		this.id = id;
		this.title = title;
		this.imageUri = imageUri;
	}
}
