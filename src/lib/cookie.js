
export async function getTokenCookie() {
    const token = (await cookies()).get("token")
    return token
  }