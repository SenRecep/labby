import UserViewDto from "./userView.dto.js";
export class SignInResponseDto {
  constructor(token, user) {
    this.accessToken = token;
    this.profile = new UserViewDto(user);
  }
}

export default SignInResponseDto;
