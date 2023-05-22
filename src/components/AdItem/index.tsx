import { Link } from "react-router-dom";
import { Item } from "./styled";
//types
import { AdItemType } from "../../Types/ApiType";

type Props = {
	data:AdItemType;
}

export const AdItem = (props:Props)=>{

	let price = "";

	if(props.data.priceNegotiable){
		price = "Preço Negociavel";
	} else {
		price = `R$${props.data.price}`;
	}

	return(
		<Item className="adItem">
			<Link to={`/ad/${props.data._id}`}>
				<div className="itemImage">
					<img src={`${props.data.images != undefined ?
					"http://localhost:3000/media/"+props.data.images[0].url : props.data.image}
					 `} alt="" />
				</div>
				<div className="itemName">
					{props.data.title}
				</div>
				<div className="itemPrice">{price}</div>
			</Link>
		</Item>
	);
}