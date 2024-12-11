import axiosRequest from "@/plugins/request";
import { IBaseResponse } from "@/types/base-response";
import { IDataSongList, ISongDetail } from "@/types/song";
import onRemoveParams from "@/utils/on-remove-params";

const prefix = "v1/admin/songs";

const SongService = {
  getAllSong: async (
    query: Record<string, any>
  ): Promise<IBaseResponse<IDataSongList>> => {
    try {
      const rs = await axiosRequest.get(`${prefix}`, {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getSongDetail: async (id: number): Promise<IBaseResponse<ISongDetail>> => {
    try {
      const rs = await axiosRequest.get(`${prefix}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateSong: async (
    id: number,
    data: Record<string, any>
  ): Promise<IBaseResponse<ISongDetail>> => {
    try {
      const rs = await axiosRequest.patch(`${prefix}/${id}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteSong: async (id: number): Promise<IBaseResponse<any>> => {
    try {
      const rs = await axiosRequest.delete(`${prefix}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default SongService;
