//types
import StateType from "../../Types/StateType";
//components
import { PageArea  } from "./styled";
import { PageContainer  } from "../../components/MainComponents";
import { AdItem } from "../../components/AdItem";
//react
import { useState,  useEffect } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
//helpers
import  OlxApi from "../../helpers/OlxApi"

let timer:number;

const Ads = ()=>{

	
	const navigate = useNavigate();

	const useQueryString = ()=>{
		return new URLSearchParams(useLocation().search);
	}
	const query = useQueryString();

	const getQ = query.get("q");
	const getCat = query.get("cat");
	const getState = query.get("state");

	const [q , setQ] = useState(getQ != null ? getQ : "");
	const [cat,setCat] = useState(getCat != null ? getCat : "");
	const [state , setState] = useState(getState != null ? getState : "");

	const [adsTotal , setAdsTotal] = useState(0);
	const [stateList , setStateList] = useState([]);
	const [categories , setCategories] = useState([]);
	const [adList , setAdList] = useState([]);
	const [pageCount , setPageCount] = useState(0);
	const [currentPage , setCurrentPage] = useState(1);


	const [loading , setLoading] = useState(true);
	const [currentOpacity, setCurrentOpacity] = useState(1);


	//FIL|TRO ADS
	const getAdsList = async ()=>{
		setLoading(true);

		let offset:number = (currentPage -1 ) *2;

		const json = await OlxApi.getAds({
			sort:"desc",
			limit:9,
			q,
			cat,
			state,
			offset
		});
		setAdList(json.ads);
		setAdsTotal(json.total);
		setCurrentOpacity(1);
		setLoading(false);
	}

	//PAGINAÇÃO
	useEffect(()=>{
		if(adList.length > 0){
			setPageCount( Math.ceil(adsTotal / adList.length));
		} else {
			setPageCount(0);
		}
	},[adsTotal])


	//URL FILTER
	useEffect(()=>{

		let queryString = [];
		if(q){
			queryString.push(`q=${q}`)
		}
		if(cat){
			queryString.push(`cat=${cat}`)
		}
		if(state){
			queryString.push(`state=${state}`)
		}

		navigate({
			search:`?${queryString.join("&")}`
		})

		if(timer){
			clearTimeout(timer);
		}
		timer = setTimeout(getAdsList , 1000);
		setCurrentPage(1);
		setCurrentOpacity(0.3);
		
	},[q,cat,state])

	//ESTADOS
	useEffect(()=>{
		try{
			
			const getStates = async ()=>{
				const sList = await OlxApi.getStates();
				setStateList(sList);
			}
			getStates();
		}catch(e){
			console.log(e);
		}
	},[])

	useEffect(()=>{
		setCurrentOpacity(0.3);
		getAdsList();
	},[currentPage])

	//CATEGORIAS
	useEffect(()=>{
		try{
			const getCategories = async ()=>{
				const cList = await OlxApi.getCategories();
				setCategories(cList);
			}
			getCategories();
		}catch(e){
			console.log(e);
		}
	},[])

	//RECENT ADS
	useEffect(()=>{
		try{
			const getRecentAds = async ()=>{
				const json = await OlxApi.getAds({
					sort:"desc",
					limit:8
				});
				setAdList(json.ads);
			}
			getRecentAds();
		}catch(e){
			console.log(e);
		}
	},[])

	let pagination = [];
	for(let i = 1 ; i <= pageCount ; i++){
		pagination.push(i);
	}

	return(

		<PageContainer>
			<PageArea>
				<div className="leftSide">
					<form method="GET" >
						<input 
						type="text" 
						name="q"
						placeholder="O que você procura?"
						value={q}
						onChange={e=> setQ(e.target.value)}
						/>

						<div className="filterName">Estado:</div>

						<select value={state} onChange={e=> setState(e.target.value)} name="state">
							<option></option>
							{stateList.map((e:StateType,k:number)=>
								<option key={k} value={e.name}>{e.name}</option>
							)}
						</select>

						<div className="filterName">Categoria:</div>

						<ul>
							{categories.map((e:any,k:number)=>
								<li className={cat == e.slug ? "categoryItem active" : "categoryItem"} 
								key={k}
								onClick={()=>setCat(e.slug)}
								>
									<img src={e.img} alt="" />
									<span>{e.name}</span>
								</li>
							)}
						</ul>

					</form>
				</div>
				<div className="rightSide">
					<h2>Resultados</h2>
					{loading && adList.length === 0 &&
						<div className="listWarning">Carregando...</div>
					}
					{!loading && adList.length === 0 &&
						<div className="listWarning">Nenhum Resultado Encontrado.</div>
					}
					<div className="list" style={{opacity:currentOpacity}}>
						{adList && 
						adList.map((e,k)=>
							<AdItem  key={k} data={e} />
						)}
					</div>

					<div className="pagination">
						{pagination.map((e:number,i:number)=>
							<div onClick={()=>setCurrentPage(i)} key={i} className={i === currentPage ? "pagItem active" : "pagItem"}>{e}</div>
						)}
					</div>

				</div>
			</PageArea>
		</PageContainer>
	);
}


export default Ads;