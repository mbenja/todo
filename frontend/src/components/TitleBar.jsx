import React from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import logo from "../assets/logo_transparent.png";

import "../styles/TitleBar.css";
import "../styles/colors.css";

function TitleBar() {
    function getCurrentDate() {
        const date = new Date();
        return `${date.toLocaleString("default", { weekday: "long" })}, ${date.toLocaleString("default", { month: "long" })} ${date.getDate()}`;
    }

    return (
        <Card className="titlebar-container bg-elevate-1">
            <CardContent>
                <div className="titlebar-logo-container">
                    <img src={logo} alt="logo" className="titlebar-logo" />
                </div>
                <div className="titlebar-date">
                    Today is {getCurrentDate()}
                </div>
            </CardContent>
        </Card>
    )
}

export default TitleBar;