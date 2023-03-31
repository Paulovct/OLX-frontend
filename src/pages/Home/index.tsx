//types
import StateType from "../../Types/StateType";
//components
import { PageArea , SearchArea } from "./styled";
import { PageContainer  } from "../../components/MainComponents";
import { AdItem } from "../../components/AdItem";
//react
import { useState,  useEffect } from "react";
import { Link } from "react-router-dom";
//helpers
import  OlxApi from "../../helpers/OlxApi"


const Home = ()=>{
	
	const [stateList , setStateList] = useState([]);
	const [categories , setCategories] = useState([]);
	const [adList , setAdList] = useState([]);

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

	return(

		<>
			<SearchArea>
				<PageContainer>
					<div className="searchBox">
						<form method="GET" action="/ads">
							<input type="text" placeholder="O que você procura?"/>
							<select name="state" >
								{stateList &&
									stateList.map((e :StateType,index)=>
									<option key={index} value={e.name}>{e.name}</option>
									)
								}
							</select>
							<button>Pesquisar</button>
						</form>
					</div>
					{categories &&
						<div className="categoryList">
							{categories &&
								categories.map((e:any,index)=>
								<Link key={index} to={`/ads?catch=${e.name}`} className="categoryItem">
									<img src={e.img} alt=""/>
									<span>{e.name}</span>
								</Link>
							)}
						</div>
					}
				</PageContainer>
			</SearchArea>
			<PageContainer>
				<PageArea>
					<h2>Ánuncios Recentes</h2>
					{adList &&
						<>
						<div className="list">
							{adList.map((e,index)=>
								<AdItem key={index} data={e} />
							)}
						</div>
						<Link to="/ads" className="seeAllLink">Ver Todos</Link>
						<hr/>
						</>
					}

					Velit cupidatat consectetur dolore quis in nulla laboris enim eu in mollit ullamco nisi cillum excepteur labore reprehenderit consectetur est et sit do in occaecat sunt ut ut ad quis minim in ea.
				</PageArea>
			</PageContainer>
		</>
	);
}


export default Home;