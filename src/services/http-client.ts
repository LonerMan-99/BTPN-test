import axios from "axios";

const useHttpClient = () => {
 const httpClient = axios.create({
  timeout: 30000,
 });
 return { httpClient };
};

export default useHttpClient;
