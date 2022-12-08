import userRepository from "../repositories/user.repository.js";
import jwtService from "../../../services/jwt.service.js";
import SignInResponseDto from "../dtos/signInResponse.dto.js";
class AuthService {
  async signIn({ email, password }) {
    const found = await userRepository.getByEmailAndPassword(email, password);
    if (!found) throw new Error("Not found user");
    const token = jwtService.createToken(found);
    return new SignInResponseDto(token);
  }
}

const instance = new AuthService();

export default instance;

export { AuthService };
