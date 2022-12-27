import { RoleInfo } from "../../../constants/roleInfo.js";

class UserCreateDto {
  constructor(data, isAdmin) {
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.phone=data.phone;
    this.password = data.password;
    this.studentNumber = data.studentNumber;
    this.role = isAdmin ? RoleInfo.assistant : RoleInfo.student;
  }
}

export default UserCreateDto;
