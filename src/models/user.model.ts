import crypto from "crypto";
import type { UserType } from "../types.js";

const id = crypto.randomBytes(8).toString('hex');

export let UserModel = {
    id,
    fullname: "",
    email: "",
    password: "",
    username: "",
    loans: [],
    role: "user"
} as UserType