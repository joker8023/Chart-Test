import { DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';


export interface ApiResponse {
  data: unknown;
  message: string| null;
  sys_status: string;
}

export interface TableData{
  x:string;
  y:string;
}


export interface Table1Model {
  data:TableData[]
  loading:boolean
}
export interface Table2Model {
  data:TableData[]
}


export interface RouterState extends DispatchProp, RouteComponentProps {
  table1: Table1;
}
