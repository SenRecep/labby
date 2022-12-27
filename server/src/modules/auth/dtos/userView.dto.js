class UserViewDto {
  constructor(user) {
    this.id = user._id;
    this.role = user.role;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.studentNumber = user.studentNumber;
    this.registrationToken=user.registrationToken;
    this.fullName=`${this.name} ${this.surname}`;
  }
}

export default UserViewDto;
