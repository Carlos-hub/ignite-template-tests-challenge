import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IAuthenticateUserResponseDTO } from "./IAuthenticateUserResponseDTO";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new IncorrectEmailOrPasswordError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new IncorrectEmailOrPasswordError();
    }

    const { secret, expiresIn } = authConfig.jwt;

<<<<<<< HEAD
    const token = sign({ user }, "senhasupersecreta123", {
=======
    const token = sign({ user }, secret, {
>>>>>>> 9e595c8b0f4f80bf7eab7a3b0e834f9a24cb1981
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    }
  }
}
