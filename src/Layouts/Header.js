import { Link, NavLink } from "react-router-dom";

import React from "react";
import logo from "../Assets/Logo/COVID-19-icon-2FINAL.png";

export default function Header() {
	return (
		<nav className="navbar px-40 py-3  navbar-expand-sm navbar-dark bg-dark">
			<a className="navbar-brand" href="#">
				Navbar
			</a>
			<button
				className="navbar-toggler d-lg-none"
				type="button"
				data-toggle="collapse"
				data-target="#collapsibleNavId"
				aria-controls="collapsibleNavId"
				aria-expanded="false"
				aria-label="Toggle navigation"
			/>
			<div className="collapse navbar-collapse" id="collapsibleNavId">
				<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
					<li className="nav-item active">
						<a className="nav-link" href="#">
							Home <span className="sr-only">(current)</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">
							Link
						</a>
					</li>
					<li className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle"
							href="#"
							id="dropdownId"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							Dropdown
						</a>
						<div className="dropdown-menu" aria-labelledby="dropdownId">
							<a className="dropdown-item" href="#">
								Action 1
							</a>
							<a className="dropdown-item" href="#">
								Action 2
							</a>
						</div>
					</li>
				</ul>
				<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
					<li className="nav-item active">
						<NavLink to="/login" className="nav-link" href="#">
							Đăng nhập
						</NavLink>
					</li>
					<li className="nav-item active">
						<NavLink to="" className="nav-link" href="#">
							Đăng kí
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}
