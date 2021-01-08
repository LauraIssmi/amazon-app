import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import SellerRoute from "./components/SellerRoute";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import OrderListScreen from "./Screens/OrderListScreen";
import OrderScreen from "./Screens/OrderScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductScreen from "./Screens/ProductScreen";
import ProfilScreen from "./Screens/ProfilScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingAdressScreen from "./Screens/ShippingAdressScreen";
import SigninScreen from "./Screens/SigninScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import UserListScreen from "./Screens/UserListScreen";

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
									<li>
										<Link to="/profile">User Profile</Link>
									</li>
									<li>
										<Link to="/orderhistory">Order History</Link>
									</li>
									<li>
										<Link to="#signout" onClick={signoutHandler}>
											Sign Out
										</Link>
									</li>
								</ul>
							</div>
						) : (
							<Link to="/signin">Sign In</Link>
						)}
						{userInfo && userInfo.isSeller && (
							<div className="dropdown">
								<Link to="#admin">
									Seller <i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/productlist/seller">Products</Link>
									</li>
									<li>
										<Link to="/orderlist/seller">Orders</Link>
									</li>
								</ul>
							</div>
						)}
						{userInfo && userInfo.isAdmin && (
							<div className="dropdown">
								<Link to="#admin">
									Admin <i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/dashboard">Dashboard</Link>
									</li>
									<li>
										<Link to="/productlist">Products</Link>
									</li>
									<li>
										<Link to="/orderlist">Orders</Link>
									</li>
									<li>
										<Link to="/userlist">Users</Link>
									</li>
								</ul>
							</div>
						)}
					</div>
				</header>
				<main>
					<Route path="/cart/:id?" component={CartScreen}></Route>
					<Route path="/product/:id" component={ProductScreen} exact></Route>
					<Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
					<Route path="/signin" component={SigninScreen}></Route>
					<Route path="/register" component={RegisterScreen}></Route>
					<Route path="/shipping" exact component={ShippingAdressScreen}></Route>
					<Route path="/payment" exact component={PaymentMethodScreen}></Route>
					<Route path="/placeorder" exact component={PlaceOrderScreen}></Route>
					<Route path="/order/:id" exact component={OrderScreen}></Route>
					<Route path="/orderhistory" exact component={OrderHistoryScreen}></Route>
					<PrivateRoute path="/profile" exact component={ProfilScreen}></PrivateRoute>
					<AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
					<AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
					<AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
					<SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
					<SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
					<AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
					<Route path="/" exact component={HomeScreen}></Route>
				</main>
				<footer className="row center">All right are reserved</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
