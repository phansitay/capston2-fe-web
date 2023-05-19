import {Doctor} from "./doctor";
export interface ApiList {
  count?: number;
  data?: Doctor[];
  page?:number;
  pageCount?:number;
  total?:number;
}
