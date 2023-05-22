import {useEffect , useState} from "react";
import OlxApi from "../../helpers/OlxApi";
import Cookies from "js-cookie";
import * as C from "./styled";
import { AdItem } from "../../components/AdItem";
import { AdItemType } from "../../Types/ApiType";

const MyAccount = ()=>{

	const [userInfo , setUserInfo] = useState<any>();

	useEffect(  ()=>{
		const getInfo = async ()=>{
			let token =  Cookies.get("token");
			let json = await OlxApi.getInfo(token as string);
			if(json.error){
				console.log(json.error);
			}
			setUserInfo({...json});
		}
		getInfo();
	},[])
	return(
		<div>
			{userInfo &&
				<C.Container>
					<C.Email>
						Nome: {userInfo.name}
					</C.Email>
					<C.Email>
						Email: {userInfo.email}
					</C.Email>
					<C.State>
						Estado: {userInfo.state.name}
					</C.State>
					<h2>Anuncios:</h2> <br/>
					<C.Ads>
						{userInfo.ads.map((item:AdItemType,index:number)=>
							<C.Ad key={index}>
								<AdItem  data={{...item}} />
							</C.Ad>
						)}
					</C.Ads>
				</C.Container>
			}
		</div>
	)
}

export default MyAccount;