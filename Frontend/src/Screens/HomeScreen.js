import React, { useEffect } from "react";
import Product from "../components/Product";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";

import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

export default function HomeScreen() {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const userTopSellersList = useSelector((state) => state.userTopSellersList);
	const { loading: loadingSellers, error: errorSellers, users: sellers } = userTopSellersList;

	useEffect(() => {
		dispatch(listProducts({}));
		dispatch(listTopSellers());
	}, [dispatch]);
	return (
		<div>
			<h2>Top Sellers</h2>
			{loadingSellers ? (
				<LoadingBox></LoadingBox>
			) : errorSellers ? (
				<MessageBox>{errorSellers}</MessageBox>
			) : (
				<>
					{sellers.length === 0 && <MessageBox>No seller Found</MessageBox>}
					<Carousel showArrows autoPlay showThumbs={false}>
						{sellers.map((seller) => (
							<div key={seller._id}>
								<Link to={`/seller/${seller._id}`}>
									<img src={seller.seller.logo} alt={seller.seller.name} />
									<p className="legend">{seller.seller.name}</p>
								</Link>
							</div>
						))}
					</Carousel>
				</>
			)}
			<h2>Featured Products</h2>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					{products.length === 0 && <MessageBox>No Product Found</MessageBox>}
					<div className="row center">
						{products.map((product) => (
							<Product key={product._id} product={product}></Product>
						))}
					</div>
				</>
			)}
		</div>
	);
}
