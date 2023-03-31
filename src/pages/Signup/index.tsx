//types
import StateType from "../../Types/StateType";
//components
import { PageArea } from "./styled";
import { PageContainer , PageTitle , ErrorMessage} from "../../components/MainComponents";

import { useState , useEffect} from "react";
//helpers
import  OlxApi from "../../helpers/OlxApi"

import { setEmail } from "../../Reducers/userReducer";
import { doLogin } from "../../helpers/AuthHandler";


const Signup = ()=>{

	const [name , setName] = useState("");

	const [email , setStateEmail] = useState("");
	const [stateLoc , setStateLoc] = useState("");
  	const [password , setStatePassword] = useState("");
  	const [confirmPass , setConfirmPass] = useState("");

  	const [stateList , setStatesList] = useState([]);


 	const [disabled , setDisabled] = useState(false);
 	const [error , setError] = useState("");


 	useEffect(()=>{
 		const getStates = async ()=>{
 			const slist = await OlxApi.getStates();
 			setStatesList(slist);
 		}
 		getStates();
 	},[])


 	const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
 		setDisabled(true);
 		e.preventDefault();
 		setError('');

 		if(password !== confirmPass){
 			setError("Senhas Não Batem");
 			setDisabled(false);
 			return;
 		}


	 	const json = await OlxApi.register(name , email , password , stateLoc);


	 	if(json.error){
	 		setError(json.error)
	 		setDisabled(false);
	 	} else {
	 		doLogin(json.token);
		 	window.location.href = "/";
	 	}

	 	setDisabled(false);
 }


	return(
		<PageContainer>
			<PageTitle>Cadastrar</PageTitle>
			<PageArea>
				{error &&
					<ErrorMessage>{error}</ErrorMessage>
				}
				<form onSubmit={handleSubmit}>
					<label className="area">
						<div className="area-title">
							Nome Completo
						</div>
						<div className="area-input">
							<input 
								type="text"  
								disabled={disabled}
								value={name}
								onChange={e => setName(e.target.value)}
								required
							/>
						</div>
					</label>
					<label className="area">
						<div className="area-title">
							Estado
						</div>
						<div className="area-input">
							<select disabled={disabled} value={stateLoc} onChange={e => setStateLoc(e.target.value)} required>
								<option value=""></option>
								{stateList.map((e:StateType,i) =>(
									<option key={i} value={e._id} >{e.name}</option>
								))}
							</select>
						</div>
					</label>
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
								value={password}
								required
							/>
						</div>
					</label>
					<label className="area">
						<div className="area-title">
							Confirmar Senha
						</div>
						<div className="area-input">
							<input 
								type="password" 
								disabled={disabled} 
								onChange={e=>setConfirmPass(e.target.value)}
								value={confirmPass}
								required
							/>
						</div>
					</label>
					
					<label className="area">
						<div className="area-title"></div>
						<div className="area-input">
							<button disabled={disabled}>Fazer Cadastro</button>
						</div>
					</label>
				</form>
			</PageArea>
		</PageContainer>
	);
}


export default Signup;