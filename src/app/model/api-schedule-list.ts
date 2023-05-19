import {Schedule} from "./schedule";

export interface ApiScheduleList {
  count?: number;
  data?: Schedule[];
  page?:number;
  pageCount?:number;
  total?:number;
}
