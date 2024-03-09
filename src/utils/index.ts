import { faker } from "@faker-js/faker";
import { axiosInstance } from "../config/axios.config";
import { userData } from "../data";

export const generateTodos = (length: number) => {
  for (let i = 0; i < length; i++) {
    axiosInstance.post(
      "/todos",
      {
        data: {
          title: faker.lorem.words(),
          body: faker.lorem.words(10),
          user: userData.user.id,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      }
    );
  }
};
