import axios from "axios";

const Axios = axios.create({
    baseURL: "http://54.180.96.119",
});


if (sessionStorage.getItem("token")) {
    Axios.defaults.headers.common["Authorization"] =
        sessionStorage.getItem("token");
}



export default Axios;
