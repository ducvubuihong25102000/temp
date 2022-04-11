import { Redirect, Route } from "react-router";

import Footer from "../../Layouts/Footer";
import Header from "../../Layouts/Header";
import React from 'react'

export default function Home(props)
{
  let { Component, ...resRoute } = props;
  return (
		<Route
			{...resRoute}
			render={(propsRoute) => {
				return (
          <>
            <Header></Header>
            <Component  {...propsRoute} />
            <Footer></Footer>
					</>
				);
			}}
		/>
	);
}


