import userRepository from "../repositories/user.repository.js";
import jwtService from "../../../services/jwt.service.js";
import SignInResponseDto from "../dtos/signInResponse.dto.js";
import { ApiError } from "../../../common/apiError.js";
import HttpStatusCodes from "http-status-codes";
class AuthService {
  async signIn({ email, password }) {
    const found = await userRepository.getByEmailAndPassword(email, password);
    if (!found)
      throw new ApiError(
        "Not found user",
        HttpStatusCodes.NOT_FOUND,
        "authservice->signin"
      );
    const token = jwtService.creatToken(found);
    return new SignInResponseDto(token);
  }
}

const instance = new AuthService();

export default instance;

export { AuthService };
