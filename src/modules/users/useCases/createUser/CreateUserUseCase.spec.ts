import 'reflect-metadata';
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";


let inMemoryUsersRepository: InMemoryUsersRepository;
let createUser: CreateUserUseCase;

describe("Create User",() =>{
 beforeEach(()=>{
  inMemoryUsersRepository = new InMemoryUsersRepository()
  createUser = new CreateUserUseCase(inMemoryUsersRepository)
 });
 it("Should be able to Create an user",async () =>{
   let user:ICreateUserDTO ={
     name: "carlos",
     email: "carlos@carlos.com",
     password:"teste"
   }
   const result = await createUser.execute(user);
   expect(result).toHaveProperty("name");
 })
})