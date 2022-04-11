import axios from 'axios';
import { ACCESS_TOKEN } from '../utils/constant';



export const getCountries = () =>
    axios.get('https://api.covid19api.com/countries')

export const getReportByCountry = (country) =>
    axios.get(`https://api.covid19api.com/dayone/country/${country}`);

export default async function requestAPI(url, method, body) {
    const urlOrigin = "http://localhost:3000";

    const headers = {
        "Content-Type": "application/json",
        // 'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${ACCESS_TOKEN()}`,
        // Authorization: "Bearear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTYzNzg4OTI5OSwiZXhwIjoxNjY4NjQ3Njk5LCJzdWIiOiI2In0.4bzkpCHLun1wXPTpio59o0CcB2GbYqiO7glB-HXpJx0"
    };
    let objMeta = {
        method,
        url: `${urlOrigin}${url}`,
        headers,
        data: body,
    };
    return await axios(objMeta);


}