import {Blog} from "./blog";

export interface BlogList {
  count?: number;
  data?: Blog[];
  page?:number;
  pageCount?:number;
  total?:number;
}
