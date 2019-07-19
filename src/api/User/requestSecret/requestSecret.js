import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      const { email } = args;
      console.log(request.user);
      const loginSecret = generateSecret();
      try {
        console.log(loginSecret);
        console.log("thats true");
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
