import crypto from "crypto";

export function createUUID() {
    const id = crypto.randomBytes(4).toString('hex');
    return id
}