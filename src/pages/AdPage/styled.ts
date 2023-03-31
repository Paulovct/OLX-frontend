import styled from "styled-components";

type Props = {
	height?:number;
}

export const Fake = styled.div<Props>`
	background-color:#DDD;
	height:${props=>props.height || 20}px;
`;

export const PageArea = styled.div`
	display:flex;
	margin-top:40px;


	.createdby{
		display:flex;
		flex-wrap:wrap;
		strong{
			margin-left:3px;
		}
		small{
			color:#555;
			margin-top:5px;
			margin-bottom:5px;
		}
	}
	.box{
		background-color:#FFF;
		border-radius:5px;
		box-shadow:0 0 4px #999;
		margin-bottom:20px;
	}

	.padding{
		padding:10px;
	}

	.leftSide{
		flex:1;
		margin-right:20px;

		.box{
			display:flex;
		}

		.adImage{
			width:320px;
			height:320px;
			margin-right:20px;

			.each-slide img{
				display:flex;
				align-items:center;
				justify-content:center;
				background-size:cover;
				height:320px;
				width:320px;
			}
		}
		.adInfo{
			flex:1;

			.adName{
				margin-bottom:20px;

				h2{
					margin:0;
					margin-top:20px;
				}
				small{
					color:#999;
				}
			}
			.adDescription{
			
				small{
					color:#999;
				}
			}	

		}

	}

	.rightSide{
		width:250px;

		.price span{
			color:#0000FF;
			display:block;
			font-size:27px;
			font-weight:bold;
		}

		.contactSellerLink{
			background-color:#0000FF;
			color:#FFF;
			height:30px;
			border-radius:5px;
			box-shadow:0px 0px 4px #999;
			display:flex;
			justify-content:center;
			align-items:center;
			text-decoration:none;
			margin-bottom:20px;
			cursor:pointer;
		}
	}

	@media(max-width:600px){
		&{
			flex-direction:column;
		}

		.leftSide{
			margin:0;


			.box{
				margin:auto;
				width:320px;
				flex-direction:column;
			}
			.adInfo{
				padding:10px;
			}
		}

		.rightSide{
			width:auto;
			margin-top:20px;

			.box{
				width:320px;
				margin:auto;
			}

			.contactSellerLink{
				width:320px;
				margin:20px auto;
			}
		}
	}

`;

export const OtherArea = styled.div`
	h2{
		font-size:20px
	}
	.list{
		display:flex;
		flex-wrap:wrap;

		.adItem{
			width:25%;
		}
	}

	@media(max-width:600px){
		&{
			margin:10px;

		}
		.list .adItem{
			width:50%;
		}
	}
`;

export const BreadChumb = styled.div`
	font-size:13px;
	margin-top:20px;

	a{
		display:inline-block;
		margin: 0 5px;
		color:#000;
		text-decoration:underline;
	}
	@media(max-width:600px){
		&{
			margin:20px;
		}
	}
`;