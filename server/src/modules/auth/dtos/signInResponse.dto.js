export class SignInResponseDto {
  constructor(token) {
    this.accessToken = token;
  }
}

export default SignInResponseDto;
