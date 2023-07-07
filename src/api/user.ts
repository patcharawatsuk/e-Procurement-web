import { fakeApi } from '@axios';
export type User = {
    name: string;
    surname: string;
}

export const getUser: () => Promise<User> = async () => {
  try {
    const response = await fakeApi.get<User>(`/api/user`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};
