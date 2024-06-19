import bcrypt from "bcryptjs";

async function encryptPassword(password: string): Promise<string> {
  const encryptedPassword: string = await bcrypt.hash(password, 10);
  return encryptedPassword;
}

export { encryptPassword };
