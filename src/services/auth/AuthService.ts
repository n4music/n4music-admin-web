import axiosRequest from "@/plugins/request"

const prefixAth = 'v1/auth'

export const AuthService = {
  login: async (email: string, password: string): Promise<any> => {
    try {
      const rs = await axiosRequest.post(`${prefixAth}/sign-in`, {
        email,
        password
      })
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error);
    }
  },
  loutOut: async (): Promise<any> => {
    try {
      const rs = await axiosRequest.post(`${prefixAth}/logout`)
      return Promise.resolve(rs.data)
    } catch (error) {
      return Promise.reject(error);
    }
  }
}