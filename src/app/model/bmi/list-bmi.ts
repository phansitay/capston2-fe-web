import {Bmikid} from "./bmikid";

export interface ListBmi {
  data?: Bmikid[];
  count?:number;
  total?:number;
  page?:number;
  pageCount?:number;
}
