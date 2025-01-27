import axios from "axios";

export async function getCookie() {
  const response = axios.get("/api/auth/user", { withCredentials: true });
  return response;
}

export async function middleware() {
  const token = await getCookie();
  console.log({ "2nd": token });
}
