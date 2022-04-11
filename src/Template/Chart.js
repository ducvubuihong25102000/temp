import { Container, Typography } from "@material-ui/core";
import { getCountries, getReportByCountry } from "../apis";
import { useEffect, useState } from "react";

import CountrySelector from "../components/CountrySelector";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";
import Highlight from "../components/Hightlight";
import React from "react";
import Summary from "../components/Sumary";
import moment from "moment";
import { sortBy } from "lodash";

export default function Chart() {
	const [countries, setCountries] = useState([]);
	const [selectedCountryId, setSelectedCountryId] = useState("");
	const [report, setReport] = useState([]);

	useEffect(() => {
		getCountries().then((res) => {
			const countries = sortBy(res.data, "Country");
			setCountries(countries);
			setSelectedCountryId("vn");
		});
	}, []);

	const handleOnChange = (e) => {
		setSelectedCountryId(e.target.value);
	};

	useEffect(() => {
		if (selectedCountryId) {
			const { Slug } = countries.find(
				(country) => country.ISO2.toLowerCase() === selectedCountryId
			);
			// call API

			getReportByCountry(Slug).then((res) => {
				// xóa đi phần tử cuối cùng trong res.data		
				// res.data.pop();
				setReport(res.data);
				console.log(res.data)
			});
		}
	}, [countries, selectedCountryId]);
	return (
		<div>

			<Container style={{ marginTop: 100 }}>
				<Typography>{moment().format("LLL")}</Typography>
				<CountrySelector
					countries={countries}
					handleOnChange={handleOnChange}
					value={selectedCountryId}
				/>
				<Highlight report={report} />
				<Summary report={report} selectedCountryId={selectedCountryId} />
			</Container>

		</div>
	);
}
