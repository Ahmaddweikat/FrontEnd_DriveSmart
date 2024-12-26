import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});
axios.defaults.withCredentials = true;

class APIClient {
  endpoint;
  constructor(endpoint) {
    this.endpoint = endpoint;
    const auth = JSON.parse(localStorage.getItem("auth-storage"));
    if (auth)
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.state.token}`;
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

  postFile = (file, name, additionalData = {}) => {
    const formData = new FormData();
    formData.append(name, file);

    // // Add any additional data if provided
    // Object.entries(additionalData).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    return axiosInstance
      .post(this.endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };

  put = (data) => {
    return axiosInstance.put(this.endpoint, data).then((res) => res.data);
  };

  delete = () => {
    return axiosInstance.delete(this.endpoint).then((res) => res.data);
  };
}

export default APIClient;
