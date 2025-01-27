import axios from "axios";

export async function getCookie() {
  const response = axios.get(`${process.env.API_URL}/auth/user`, {
    withCredentials: true,
  });
  if (!response.ok) {
    return null;
  }
  return response;
}

export async function middleware() {
  const token = await getCookie();
  console.log({ "2nd": token });
}
