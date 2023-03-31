//components
import { PageArea } from "./styled";
import { PageContainer , PageTitle , ErrorMessage} from "../../components/MainComponents";

import { useState } from "react";
//helpers
import  OlxApi from "../../helpers/OlxApi"
import { doLogin } from "../../helpers/AuthHandler";
import { setEmail } from "../../Reducers/userReducer";


const Signin = ()=>{


	const [email , setStateEmail] = useState("");
  	const [password , setStatePassword] = useState("");
  	const [rememberPassword , setRememberPassword] = useState(false);
 	const [disabled , setDisabled] = useState(false);
 	const [error , setError] = useState("");



 	const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
 		setDisabled(true);
 		e.preventDefault();
 		setError('');
 		
	 	const json = await OlxApi.login(email , password);


	 	if(json.error ){
	 		setError(json.error)
	 		setDisabled(false);
	 	} else {
	 		doLogin(json.token,  rememberPassword);
		 	window.location.href = "/";
	 	}

	 	
 }


	return(
		<PageContainer>
			<PageTitle>Login</PageTitle>
			<PageArea>
				{error &&
					<ErrorMessage>{error}</ErrorMessage>
				}
				<form onSubmit={handleSubmit}>
					<label className="area">
						<div className="area-title">
							E-mail
						</div>
						<div className="area-input">
							<input 
								type="email"  
								disabled={disabled}
								value={email}
								onChange={e => {
									setStateEmail(e.target.value);
									setEmail(e.target.value);
								}}
								required
							/>
						</div>
					</label>
					<label className="area">
						<div className="area-title">
							Senha
						</div>
						<div className="area-input">
							<input 
								type="password" 
								disabled={disabled} 
								onChange={e=>setStatePassword(e.target.value)}
								required
							/>
						</div>
					</label>
					<label className="area">
						<div className="area-title">
							Lembrar Senha
						</div>
						<div className="area-input">
							<input 
								type="checkbox" 
								disabled={disabled}
								checked={rememberPassword}
								onChange={()=>setRememberPassword(!rememberPassword)}
							/>
						</div>
					</label>
					<label className="area">
						<div className="area-title"></div>
						<div className="area-input">
							<button disabled={disabled}>Fazer Login</button>
						</div>
					</label>
				</form>
			</PageArea>
		</PageContainer>
	);
}


export default Signin;