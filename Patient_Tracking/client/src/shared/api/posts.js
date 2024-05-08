import axios from "axios";

const URL = process.env.APIURL;
const APIKEY = process.env.APIKEY;

export default axios.create({
    baseURL: URL + APIKEY
});