import { Link } from "react-router-dom";

const NotFound = ()=>{
	return(
		<div style={{
			margin: "auto",
			display: "flex" ,
			flexDirection:"column" ,
			alignItems:"center",
			justifyContent:"center"
			}}>


			<h1>Página Não Encontrada!</h1>
			<p>Esta rota não foi Encontrada...    <Link to="/">Voltar Para o Inicio.</Link></p>
		</div>
	);
}


export default NotFound;