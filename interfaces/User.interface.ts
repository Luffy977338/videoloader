export interface IUser {
  _id: string;
  username: string;
  avatar: string | null;
  email: string;
  password: string;
}

export interface IUserCreate extends Omit<IUser, "_id"> {}

export interface IUserDto extends Omit<IUser, "password"> {}
