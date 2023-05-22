//components
import { PageArea } from "./styled";
import { PageContainer , PageTitle , ErrorMessage} from "../../components/MainComponents";

import { useNavigate } from "react-router-dom";
import { createNumberMask } from "text-mask-addons";
import MaskedInput from "react-text-mask";
import React, { useEffect, useRef, useState } from "react";
//helpers
import  OlxApi from "../../helpers/OlxApi"
import Cookies from "js-cookie";


const PostAnAd = ()=>{

	const navigate = useNavigate();

	const fileField = useRef<any>([]);


	const [title, setTitle] = useState("");
	const [category , setCategory] = useState("")
	const [categories , setCategories] = useState([]);
	const [price , setPrice] = useState("");
	const [priceNegotiable , setPriceNegotiable] = useState(false);
	const [desc , setDesc] = useState("");

 	const [disabled , setDisabled] = useState(false);
 	const [error , setError] = useState("");


 	useEffect(()=>{
 		const getCategories = async()=>{ 
 			const cats = await OlxApi.getCategories();
	 		setCategories(cats);
 		}
 		getCategories();
 	},[])


 	const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
 		setDisabled(true);
 		e.preventDefault();
 		setError('');
		let errors = []; 		

		if(!title.trim()){
			errors.push("Sem Titulo")
		}
		if(!category){
			errors.push("Sem Categoria")
		}
		let token = Cookies.get("token");
		if(!token){
			errors.push("Execute o Login Novamente")
			return;
		}

		if(errors.length === 0){

			const fData = new FormData();
			fData.append("title", title);
			fData.append("price", price);
			fData.append("priceneg" , String(priceNegotiable));
			fData.append("desc",desc);
			fData.append("cat",category);
			fData.append("token" , token as string);

			if(fileField.current.files.length > 0 ){
				for(let i = 0 ; i < fileField.current.files.length ; i++ ){
					fData.append("img", fileField.current.files[i]);
				}
			}

			const json = await OlxApi.addAd(fData);

			if(!json.error){
				navigate(`/ad/${json.id}`)
			} else {
				setError(json.error);
			}


		} else {
			setError(errors.join("/n"))
		}
		setDisabled(false);
	 	
 }
 	const priceMask = createNumberMask({
 		prefix:"  ",
 		includeThousandsSeparator:true,
 		thousandsSeparatorSymbol:".",
 		allowDecimal:true,
 		decimalSymbol:","
 	})

	return(
		<PageContainer>
			<PageTitle>Poste um Ánuncio</PageTitle>
			<PageArea>
				{error &&
					<ErrorMessage>{error}</ErrorMessage>
				}
				<form onSubmit={handleSubmit}>
					<label className="area">
						<div className="area-title">
							Titulo
						</div>
						<div className="area-input">
							<input 
								type="text"  
								disabled={disabled}
								value={title}
								onChange={e => {
									setTitle(e.target.value);
								}}
								required
							/>
						</div>
					</label>
					<label className="area">
						<div className="area-title"> Categoria </div>
						<div className="area-input">
							<select 
							disabled={disabled} 
							
							onChange={e=>setCategory(e.target.value)}>
								<option ></option>
								{categories &&
									categories.map((e:{_id:string , name:string})=>
										<option key={e._id} value={e._id}>{e.name}</option>
									)
								}

							</select>
							
						</div>
					</label>
					<label className="area">
						<div className="area-title">Preço</div>
						<div className="area-input">
							<MaskedInput 
							mask={priceMask}
							placeholder="R$  "
							disabled={disabled || priceNegotiable}
							value={price}
							onChange={e=> setPrice(e.target.value)}
							/>
						</div>
					</label>
					<label className="area">
						<div className="area-title">Preço Negociavel</div>
						<div className="area-input">
							<input type="checkbox"
							disabled={disabled}
							checked={priceNegotiable}
							onChange={()=>setPriceNegotiable(!priceNegotiable)}
							 />
							
						</div>
					</label>
					<label className="area">
						<div className="area-title">Descrição</div>
						<div className="area-input">
							<textarea value={desc} onChange={e=> setDesc(e.target.value)} >
								
							</textarea>
						</div>
					</label>
					<label className="area">
						<div className="area-title">Imagem (1 ou mais)</div>
						<div className="area-input">
							<input 
							type="file"
							disabled={disabled}
							ref={fileField}
							multiple 
							/>
						</div>
					</label>
					<label className="area">
						<div className="area-title"></div>
						<div className="area-input">
							<button disabled={disabled}>Anunciar</button>
						</div>
					</label>
				</form>
			</PageArea>
		</PageContainer>
	);
}


export default PostAnAd;