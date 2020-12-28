import React from "react";

import { BrowserRouter, Route } from "react-router-dom";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
function App() {
	return (
		<BrowserRouter>
			<div className="grid-container">
				<header className="row">
					<div>
						<a href="/" className="brand">
							amazon
						</a>
					</div>
					<div>
						<a href="/cart">Cart</a>
						<a href="/signin">Sign In</a>
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
