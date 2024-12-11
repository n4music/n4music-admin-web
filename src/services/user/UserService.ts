import axiosRequest from "@/plugins/request";
import { IBaseResponse } from "@/types/base-response";
import { IData, IUser } from "@/types/user";
import onRemoveParams from "@/utils/on-remove-params";

const prefix = 'v1/users';

export const UserService = {
  getAllUser: async (query: Record<string, any>): Promise<IBaseResponse<IData<IUser[]>>> => {
    try {
      const rs = await axiosRequest.get(`${prefix}`, {
        params: onRemoveParams(query),
      })
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getUser: async (id: number): Promise<IBaseResponse<any>> => {
    try {
      const rs = await axiosRequest.get(`${prefix}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateUser: async (id: number, data: Record<string, any>): Promise<IBaseResponse<any>> => {
    try {
      const rs = await axiosRequest.put(`${prefix}/${id}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createUser: async (data: Record<string, any>): Promise<IBaseResponse<any>> => {
    try {
      const rs = await axiosRequest.post(`${prefix}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}