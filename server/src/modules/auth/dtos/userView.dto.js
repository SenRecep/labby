class UserViewDto{
    constructor(user)
    {
        this.id=user._id;
        this.name=user.name;
        this.surname=user.surname;
        this.email=user.email;
        this.password=user.password;
        this.studentNumber=user.studentNumber;
    }
}

export default UserViewDto;