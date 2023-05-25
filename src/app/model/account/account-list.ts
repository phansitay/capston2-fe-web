import{Account} from "./account";

export interface AccountList {
  count?: number;
  data?: Account[];
  page?:number;
  pageCount?:number;
  total?:number;
}
