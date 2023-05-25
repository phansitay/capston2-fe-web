import {User} from "./user";

export interface Blog {
  id?: number;
  name?: string;
  content?:string;
  user?:User;
  createdAt?:string;
}
