export type AdInfoType = {
	title:string;
	dateCreated:number;
	description:string;
	views:number;
}

export type AdItemType = {
	id:string;
	_id:string;
	title:string;
	price:number;
	priceNegotiable:boolean;
	description:string;
	dateCreated:number;
	views:number;
	image:string;
	images:[{
		url:string;
	default:boolean;
	}]
	category:{
		id:string;
		name:string;
		slug:string;
	};
	userInfo:{
		name:string;
		email:string;
	};
	stateName:string;
	others:Other[];
}
export type Other = {
	id:string;
	title:string;
	price:number;
	priceNegotiable:boolean;
	image:string;
}

