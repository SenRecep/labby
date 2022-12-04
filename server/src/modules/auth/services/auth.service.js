import jwt from "jsonwebtoken";

class jwtToken {
  maxAge = 3 * 24 * 60 * 60;
  creatToken = (id, email, name, surname, studentNumber) => {
    return jwt.sign({ id, email, name, surname, studentNumber }, "jwt", {
      expiresIn: maxAge,
    });
  };
}



const token = new jwtToken();

export default token;

export { jwtToken };
