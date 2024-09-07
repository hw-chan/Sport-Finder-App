import { jwtDecode } from "jwt-decode";

export default function getUserId(token) {
  const decode = jwtDecode(token);
  const userId = decode.id;

  return userId;
}