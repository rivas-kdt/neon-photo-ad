import axios from "axios";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCookie() {
  const response = axios.get(`${process.env.API_URL}/auth/cookie`);
  await wait(10000);
  return response.data;
}

export async function middleware(request, context) {
  context.waitUntil(getCookie().then((json) => console.log(json)));
}
