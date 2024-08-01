export interface SiginUpUserReq {
  name: string;
  email: string;
  password: string;
}

export interface SiginUpUserResponse {
  id: string;
  name: string;
  email: string;
}
