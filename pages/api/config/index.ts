import axios from "axios";
import interceptor from "./interceptor";

// import type { Instance } from "./types";

const createInterceptor = () => {
  const baseInstance = axios.create({
    baseURL: "http://localhost:8080/api",
  });
  baseInstance.defaults.withCredentials = true;
  interceptor(baseInstance);

  return baseInstance;
};

const Instance = createInterceptor();

export default Instance;
