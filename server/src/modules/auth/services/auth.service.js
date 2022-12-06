import jwt from "jsonwebtoken";

class jwtToken {
  maxAge = 3 * 24 * 60 * 60;
  creatToken = ({ _id, email, name, surname, studentNumber, role }) => {
    return jwt.sign(
      { id: _id.toString(), email, name, surname, studentNumber, role },
      "jwt",
      {
        expiresIn: this.maxAge,
      }
    );
  };
}

const token = new jwtToken();

export default token;

export { jwtToken };
