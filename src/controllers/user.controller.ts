import {userDB} from "../databases/user.db.js";
import { UserModel } from "../models/user.model.js";
import type { UserType } from "../types.js";
import jwt from "jsonwebtoken";
import { createUUID } from "../utils/helpers.js";

const allowedRoles = ["admin", "user"]
class User {
    getAllUser = async (req:any, res:any, next:any) => {
        try {
            return res.status(200).json({
                success: true,
                status: 200,
                users: userDB
            })
            
        } catch (error) {
            next(error)
        }
    }
    registerUser = async (req: any, res:any, next:any) => {
        try{
            let { fullname, email, password, role } = req.body;
            
            if (!fullname || !email || !password) {
                return next({
                    status: 400,
                    message: "All fields are required"
                });
            }
            if (role && !allowedRoles.includes(role)) {
               return next({
                    status: 400,
                    message: "Invalid role provided"
                });
            }

            role = String(role).toLowerCase().trim()
            fullname = String(fullname).trim()
            email = String(email).toLowerCase().trim()
            password = String(password).trim();

            const existingUser = userDB.find((m:any) => m?.email === email);
            if (existingUser) {
                return next({
                    status: 400,
                    message: "User already exists"
                });
            }

            // todo: hash password, test email to be valid,

            // save to db
            const newUser = {
                id: createUUID(),
                fullname,
                email,
                password,
                role: role === "undefined" || !role ?  UserModel.role : role ,
                loans: [],
                username: fullname[0] + fullname[1]
            } as UserType
            //create token
            const payload = {
                id: newUser.id,
                role: newUser.role,
             }
             const jwt_secret = process.env.JWT_SECRET || "";
             const token = jwt.sign(payload, jwt_secret, {expiresIn: "1h"});

            userDB.push(newUser);
            return res.status(201).json({
                message: "User created Sucessfully",
                code: 201,
                user: newUser,
                token,
            })
        } catch (error) {
            next(error);
        }
    }
    loginUser = async (req: any, res:any, next:any) => {
        try{
            let { email, password } = req.body;
            
            if ( !email || !password) {
                return next({
                    status: 400,
                    message: "All fields are required"
                });
            }

            email = String(email).toLowerCase().trim()
            password = String(password).trim();

        
            const existingUser= userDB.find((m:any) => m?.email === email);
            if (!existingUser) {
                return next({
                    status: 400,
                    message: "Invalid Email or Password"
                });
            }
            if (password !== existingUser?.password) {
                return next({
                    status: 400,
                    message: "Invalid Email or Password"
                });
            }
            const payload = {
                id: existingUser.id,
                role: existingUser.role,
             }
            const jwt_secret = process.env.JWT_SECRET || "";
            const token = jwt.sign(payload, jwt_secret, { expiresIn: "1h" });

            return res.status(200).json({
                message: `Welcome back, ${existingUser?.fullname}`,
                code: 200,
                user: existingUser,
                token
            });
            
        } catch (error) {
            next(error);
        }

    }
    getUserById = (req:any, res:any, next:any) => {
        const { id } = req.user;
        const user = userDB.find((u:any) => u.id === id);
        if (!user) {
            return next({
                status: 404,
                message: "No user found"
            })
        }
        return res.status(200).json({
            message: "User found",
            code: 200,
            user
        })
    }
    

}

export default new User;