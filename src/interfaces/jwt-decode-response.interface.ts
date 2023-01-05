import { Role } from "../enums/role.enum";


export interface JwtDecodeResponse {
  id: string,
  email: string,
  role: Role,
  iat: number,
  exp: number,
}
