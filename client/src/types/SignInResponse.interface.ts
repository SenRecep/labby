import { User } from "@/types/User.interface";
export interface SignInResponse {
  accessToken: string;
  profile: User;
}
