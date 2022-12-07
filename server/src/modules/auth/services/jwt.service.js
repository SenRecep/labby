import jwt from "jsonwebtoken";

class JwtService {
  maxAge = 3 * 24 * 60 * 60;
  creatToken = ({ _id, email, name, surname, studentNumber, role }) => {
    return jwt.sign(
      { id: _id.toString(), email, name, surname, studentNumber, role },
      process.env.JWT_SECRET,
      {
        expiresIn: this.maxAge,
      }
    );
  };
}

const instance = new JwtService();

export default instance;

export { JwtService };
