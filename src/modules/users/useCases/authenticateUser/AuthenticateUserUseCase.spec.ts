import 'reflect-metadata';
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';


let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUser: CreateUserUseCase;

describe("Create User",() =>{
 beforeEach(()=>{
  inMemoryUsersRepository = new InMemoryUsersRepository()
  authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
  createUser = new CreateUserUseCase(inMemoryUsersRepository)
 });
 it("Should be able to authenticate  an user",async () =>{
   let user:ICreateUserDTO ={
     name: "carlos",
     email: "carlos@carlos.com",
     password:"teste"
   }
   await createUser.execute(user);
   const result = await authenticateUserUseCase.execute({email:user.email,password:user.password});
   expect(result).toHaveProperty("token");
 })
})