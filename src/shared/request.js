import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:3000",
});


if (sessionStorage.getItem("token")) {
    Axios.defaults.headers.common["Authorization"] =
        sessionStorage.getItem("token");
}





export default Axios;
