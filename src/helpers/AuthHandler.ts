import Cookies from "js-cookie";

export const isLoged = ()=>{
	let token = Cookies.get("token");
	if(token != undefined){
		return true;
	} else {
		return false;
	}
}
	
export const doLogin = (token: string , rememberPassword?:boolean)=>{
	if(rememberPassword){
		Cookies.set("token" , token , {expire:999});
	}else {
		Cookies.set("token" , token );
	}
}

export const doLogout = ()=>{
	Cookies.remove("token");
}