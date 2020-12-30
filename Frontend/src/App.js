import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import ProductScreen from "./Screens/ProductScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingAdressScreen from "./Screens/ShippingAdressScreen";
import SigninScreen from "./Screens/SigninScreen";

function App() {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const dispatch = useDispatch();
	const signoutHandler = () => {
		dispatch(signout());
	};
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
						{userInfo ? (
							<div className="dropdown">
								<Link to="#">
									{userInfo.name} <i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<Link to="#signout" onClick={signoutHandler}>
										Sign Out
									</Link>
								</ul>
							</div>
						) : (
							<Link to="/signin">Sign In</Link>
						)}
					</div>
				</header>
				<main>
					<Route path="/cart/:id?" component={CartScreen}></Route>
					<Route path="/product/:id" component={ProductScreen}></Route>
					<Route path="/signin" component={SigninScreen}></Route>
					<Route path="/register" component={RegisterScreen}></Route>
					<Route path="/shipping" exact component={ShippingAdressScreen}></Route>
					<Route path="/payment" exact component={PaymentMethodScreen}></Route>
					<Route path="/" exact component={HomeScreen}></Route>
				</main>
				<footer className="row center">All right are reserved</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
