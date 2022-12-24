class UserTokenUpdateDto {
  constructor(data) {
    this.userId = data.userId;
    this.token = data.token;
  }
}

export default UserTokenUpdateDto;
