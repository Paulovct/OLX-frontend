import Cookies from "js-cookie";
import QueryString from "qs";


const base = "http://localhost:3000";

type Options = {
	sort:string;
	limit:number;
	q?:string;
	cat?:string;
	state?:string;
	offset?:number;
}

const apiFetchFile = async (endpoint:string , body:any )=>{
		if(!body.token){
		let token = Cookies.get("token");
		if(token){
			body.token=token;
		}
	}

	 const res = await fetch(base+endpoint,{
		method:"POST",
		body
	})

	const json = await res.json();
	
	/*if(json.notallowed){
		window.location.href = "/";
		return;
	}*/
	
	return json;
}


const apiFetchPost = async (endpoint:string , body:any)=>{
	if(!body.token){
		let token = Cookies.get("token");
		if(token){
			body.token=token;
		}
	}

	 const res = await fetch(base+endpoint,{
		method:"POST",
		headers:{
			"Accept":"application/json",
			"Content-Type":"application/json"
		},
		body: JSON.stringify(body)
	})

	const json = await res.json();
	
	if(json.notallowed){
		
	}
	
	return json;
}




export const apiFetchGet = async (endpoint:string , body?:any | [] )=>{
	try{

	const res = await fetch(`${base + endpoint}?${QueryString.stringify(body)}`)

	const json = await res.json();

	
	return json;
	}catch(error){
		console.error(error);
	}
}




 const OlxApi = {
	login:async(email:string , password:string) => {
		const json = await apiFetchPost(
			"/user/signin",
			{email,password}
		);

		return json;
	},

	register:async(name:string , email:string , password:string , stateLoc:string)=>{
		const json = await apiFetchPost(
			"/user/signup",
			{name , email , password , state:stateLoc}
		)
		return json;
	}

	,
	
	getStates:async()=>{
		const json = await apiFetchGet(
			'/states'
			);
		return json.states; 
	},

	getCategories:async  ()=>{
		const json = await apiFetchGet(
			"/categories"
		)
		return json;
	},

	getAds: async(options:Options)=>{
		const json = await apiFetchGet(
			"/ad/list",
			options
	);
		return json;

	},

	getAd: async (id ?:string, other = false)=>{
		const json = await apiFetchGet(
			`/ad/item`,
			{id,other}
		)
		return  json ;
	},

	addAd: async (fData:any)=>{
		const json = await apiFetchFile(
			"/ad/add",
			fData
		);
		return json;
	},
	getInfo:async(token:string)=>{
		const json = await apiFetchGet(
			"/user/me",
			{token}
		);
		return json;
	}
}

export default OlxApi;


