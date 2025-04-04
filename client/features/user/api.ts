import axios from 'axios';

import { instance } from '../../lib/instance';

type GetUserParams = {
  id: number;
};

type EditUserParams = {
  id: number;
  name: string;
  email: string;
  avatar?: File;
};

export class UsersApi {
  static async getUser(params: GetUserParams) {
    try {
      const res = await instance.get(`/users/${params.id}`);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }

  static async editUser(params: EditUserParams) {
    const { id, ...data } = params;

    const formData = new FormData();

    Object.entries(data).forEach(([k, v]) => formData.append(k, v));

    try {
      const res = await instance.patch(`/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
    }
  }
}
