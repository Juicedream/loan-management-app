import crypto from "crypto";
const id = crypto.randomBytes(8).toString('hex');
export let UserModel = {
    id,
    fullname: "",
    email: "",
    password: "",
    username: "",
    loans: [],
    role: "user"
};
//# sourceMappingURL=user.model.js.map