import { CreateUserDto, LoginCredentials, User } from "../models/user.model";
import {v4 as uuidv4} from "uuid";
import { PasswordUtil } from "../utils/passwordUtils";
import { JwtUtil } from "../utils/tokenUtils";

export class AuthService {
    private static userEmails: Set<string> = new Set();
    private static usersDB: Map<string, User> = new Map();
    constructor() {};

    static async signup(createUserPayload: CreateUserDto): Promise<any> {
        
       for(const [_, userData] of AuthService.usersDB) {
            if(userData.email === createUserPayload.email) {
                throw new Error("A user with given email already exist!")
            }
       }

       const newUserId = uuidv4();
       const hashedPassword = await PasswordUtil.hashPassword(createUserPayload.password);
       const userObj = {
            email: createUserPayload.email,
            id: newUserId,
            password: hashedPassword
        };

        this.userEmails.add(userObj.email);
        this.usersDB.set(newUserId, userObj);
       
        return { userId: newUserId };
    }
  
    static async login(loginCredentials: LoginCredentials): Promise<string> {
        let userObj: User | null = null;
        for(const [_, userData] of AuthService.usersDB) {
            if(userData.email === loginCredentials.email) {
                if(await PasswordUtil.verifyPassword(loginCredentials.password, userData.password)) {
                    userObj = userData;
                } else {
                    throw new Error("Invalid credentials!")
                }
            }
        }

        if(!userObj) {
            throw new Error("No user details found with provided credentials");
        }

        return JwtUtil.generateToken({email: userObj.email, id: userObj.id});
    }
  }
  