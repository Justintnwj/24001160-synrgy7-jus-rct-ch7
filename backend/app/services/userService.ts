import userRepository from "../repositories/userRepository";

type createUserType = {
  email: string;
  encryptedPassword: string;
  name: string;
};

export default {
  async create(requestBody: createUserType) {
    return userRepository.create(requestBody);
  },

  async update(id: string, requestBody: { role: string }) {
    return userRepository.update(id, requestBody);
  },

  async delete(id: string) {
    return userRepository.delete(id);
  },

  async list() {
    try {
      const users = await userRepository.findAll();
      const userCount = await userRepository.getTotalUser();

      return {
        data: users,
        count: userCount,
      };
    } catch (err) {
      throw err;
    }
  },

  async get(id: string) {
    const user = await userRepository.find(id);
    return user;
  },

  async findOne(email: string) {
    return userRepository.findOne(email);
  },

  async findAdmin(role: string) {
    return userRepository.findOne(role);
  },
};
