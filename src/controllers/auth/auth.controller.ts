import {Request, Response} from "express";
import { registerSchema } from "./auth.schema";
import { User } from "../../models/user.model";
import { hashPassword } from "../../lib/hash";


export async function registerHandler(req : Request, res : Response){
    try{
        
        // checkening the request wheather it is following our schema structure or not which is defined in auth.schema
        const result = registerSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({ message : "Inavalid data", errors : result.error.flatten()})
        }

        const {name, email, password} = result.data;

        const normalizedEmail = email.toLowerCase().trim();
        
        //Checking if mail already exists or not
        const existingUser = await User.findOne({email : normalizedEmail});
    
        if(existingUser){
            return res.status(409).json({ message : "Email is already in use! Please try with a different email"});
        }

        //Hashing our password
        const passwordHash = await hashPassword(password);

        //Creating user
        const newlyCreatedUser = await User.create({
            email : normalizedEmail,
            password : passwordHash,
            role : 'user',
            isEmailVerified : false,
            twoFactorEnabled : false,
        })

        //email verification part

    }catch(err){

    }
}