import { Redirect, Route } from "react-router";

import React from 'react'

export default function Admin(props) {
    let { Component, ...resRoute } = props;
    return (
        <Route
            {...resRoute}
            render={(propsRoute) => {
                return (
                    <>
                        <Component  {...propsRoute} />
                    </>
                );
            }}
        />
    );
}


