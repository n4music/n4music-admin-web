export interface IData<T> {
  list: T;
  total: number;
}

export interface IUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: null;
  address: null;
  gender: null;
  birthday: null;
  status: number;
  type: number;
  avatarId: null;
  images: any;
  creatorId: null;
  creatorInfo: any;
}

export interface ICreateUser extends IUser {
  roleId?: number;
  password?: string;
}
