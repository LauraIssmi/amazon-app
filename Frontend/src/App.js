import React from "react";
import { useSelector } from "react-redux";

import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
function App() {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="row">
					<div>
						<Link to="/" className="brand">
							amazon
						</Link>
					</div>
					<div>
						<Link to="/cart">Cart</Link>
						{cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
						<Link to="/signin">Sign In</Link>
					</div>
				</header>
				<main>
					<Route path="/cart/:id?" component={CartScreen}></Route>
					<Route path="/product/:id" component={ProductScreen}></Route>
					<Route path="/" exact component={HomeScreen}></Route>
				</main>
				<footer className="row center">All right are reserved</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
