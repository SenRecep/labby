class UserCreateDto{
    constructor(data)
    {
        this.name=data.name;
        this.surname=data.surname;
        this.email=data.email;
        this.password=data.password;
        this.studentNumber=data.studentNumber;
    }
}

export default UserCreateDto;