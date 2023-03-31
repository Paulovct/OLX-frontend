export type AdInfoType = {
	title:string;
	dateCreated:number;
	description:string;
	views:number;
}

export type AdItemType = {
	id:string;
	title:string;
	price:number;
	priceNegotiable:boolean;
	description:string;
	dateCreated:number;
	views:number;
	image:string;
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
	images:string[];
	others:Other[];
}
export type Other = {
	id:string;
	title:string;
	price:number;
	priceNegotiable:boolean;
	image:string;
}

