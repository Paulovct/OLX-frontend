//components
import { PageArea , Fake , OtherArea, BreadChumb } from "./styled";
import { PageContainer  } from "../../components/MainComponents";
import { AdItem } from "../../components/AdItem";
//react
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image"
import  "react-slideshow-image/dist/styles.css";
//helpers
import  OlxApi from "../../helpers/OlxApi"
//type
import { AdItemType } from "../../Types/ApiType";




const AdPage = ()=>{

	const api = OlxApi;
	const { id } = useParams();

	const [loading , setLoading] = useState(true);
	const [adInfo , setAdInfo] = useState<any>({});

						
	useEffect(()=>{
		const getAdInfo = async (id :string | undefined)=>{
			const json = await api.getAd(id , true);
			if(json.error){
				console.log(json.error);
			}else{
				setAdInfo(json);
				setLoading(false);
			}
		}
		getAdInfo(id);
	},[])

	const formatDate = (date:number)=>{
		let cDate = new Date(date);

		let momths = ["janeiro" , "fevereiro" , "março" , "abril" , "maio" , "junho" , "julho" , "agosto" , "setembro" , "outubro", "novembro" , "dezembro"]
		let cDay = cDate.getDate();
		let cMonth = cDate.getMonth();
		let cYear = cDate.getFullYear();

		return `${cDay} de ${momths[cMonth]} de ${cYear}`
	}

	return(
		<PageContainer>

		{adInfo.category &&
			<BreadChumb>
				Você está aqui:
				<Link to="/">Home</Link>
				/
				<Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
				/
				<Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
				/
				<Link to="">{adInfo.title}</Link> 
			</BreadChumb>

		}
			


			<PageArea>
				<div className="leftSide">
					<div className="box">
						<div className="adImage">
							{loading &&
								<Fake height={300} />
							}
								
							{adInfo.images && !loading &&
								<Slide>
									{adInfo.images.map((e:string,i:number)=>
										<div key={i} className="each-slide">
											<img src={e} alt="" />
										</div>
									)}
								</Slide>
							}


						</div>
						<div className="adInfo">
							<div className="adName">
								{loading &&
									<Fake height={20} />
								}
								{adInfo.title &&
									<h2>{adInfo.title}</h2>
								}
								{adInfo.dateCreated &&
									<small>Criado em {formatDate(adInfo.dateCreated)}</small>
								}
							</div>
							<div className="adDiscription">
								{loading && <Fake height={100}/> }
								{adInfo.description}
								<hr />
								{adInfo.views &&
									<small>Visualizações: {adInfo.views}</small>
								}
							</div>
						</div>
					</div>
				</div>
				<div className="rightSide">
					<div className="box padding">
						{loading && <Fake height={20} /> }

						{adInfo.priceNegotiable && "Preço Negociavel"}

						{!adInfo.priceNegotiable && adInfo.price &&
							<div className="price">Preço: <span>R$ {adInfo.price}</span></div>
						}
					</div>
					{loading && <Fake height={50} /> }
					{adInfo.userInfo &&
						<>
								<a href={`mailto:${adInfo.userInfo.email}`} target="_blank" className="contactSellerLink" >Fale com o Vendedor!</a>
							<div className="createdby box padding">
								Criado por:
								<strong>{adInfo.userInfo.name}</strong>
								<small>Email: {adInfo.userInfo.email}</small>
								<small>Estado: {adInfo.stateName}</small>
							</div>
						</>
					}

				</div>


			</PageArea>
			<OtherArea>
				{adInfo.others &&
					<>
						<h2>Outras ofertas do Vendedor</h2>
						<div className="list">
							{adInfo.others.map((e:AdItemType,index:number)=>(
								<AdItem data={e} key={index} />
							))}
						</div>
					</>
				}
			</OtherArea>
		</PageContainer>
	);
}


export default AdPage;