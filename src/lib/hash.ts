import bcrypt from "bcryptjs";

//
export async function hashPassword(password : string) {
    const salt = await bcrypt.genSalt(12);// random data
    const hash = await bcrypt.hash(password, salt);//This combines the original password with the salt and runs bcrypt's hashing algorithm.

    return hash;
}