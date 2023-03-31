import { Link } from "react-router-dom";
import { HeaderArea } from "./styled";

import { doLogout, isLoged } from "../../helpers/AuthHandler";

const Header = ()=>{

	let logged = isLoged();

	const handleLogout = ()=>{
		doLogout();
		window.location.href="/";
	};

	return (
		<HeaderArea>
			<div className="container">
				<div className="logo">
					<Link to="/">
						<span className="logo-1">O</span>
						<span className="logo-2">L</span>
						<span className="logo-3">X</span>
					</Link>
				</div>
				<nav>
					<ul>

						{logged &&
							<>
							<li>
								<Link to="/my-account">Minha Conta</Link>
							</li>
							<li>
								<button onClick={handleLogout}>Sair</button>
							</li>
							
							</>
						}

						{!logged &&
							<>
							<li>
								<Link to="/signin">Login</Link>
							</li>
							<li>
								<Link to="/signup">Cadastrar</Link>
							</li>
							</>
						}
						<li>
							<Link to={logged ? "/post-an-ad": "/signin"} className="button">Poste um Anuncio</Link>
						</li>

					</ul>
				</nav>
			</div>
		</HeaderArea>
	);
}

export default Header;