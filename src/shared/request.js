import axios from "axios";

const Axios = axios.create({
    baseURL: "http://54.180.96.119",
});


if (localStorage.getItem("token")) {
    Axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
        console.log(localStorage.getItem("token"))
}



export default Axios;
