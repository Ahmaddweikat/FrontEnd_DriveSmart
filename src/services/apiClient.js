import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});
axios.defaults.withCredentials = true;

class APIClient {
  endpoint;
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  static setAuthorizationHeader = (token) => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  get = () => {
    return axiosInstance.get(this.endpoint).then((res) => res.data);
  };

  post = (data) => {
    return axiosInstance.post(this.endpoint, data).then((res) => res.data);
  };

  put = (data) => {
    return axiosInstance.put(this.endpoint, data).then((res) => res.data);
  };

  delete = () => {
    return axiosInstance.delete(this.endpoint).then((res) => res.data);
  };
}

export default APIClient;
