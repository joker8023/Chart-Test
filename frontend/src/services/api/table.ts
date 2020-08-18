import Request from '../request';
import { AxiosResponse } from 'axios';
import { ApiResponse, TableData } from '@/interfaces/type';

// 生成新数据
export function genData(): Promise<AxiosResponse<ApiResponse>> {
  return Request.get('/api/v1/table/gen_data');
}

// 获取表数据
export function getData(table:string): Promise<AxiosResponse<ApiResponse>> {
  return Request.get(`/api/v1/table?table=${table}`);
}
// 插入数据
export function insertData(data:TableData[]): Promise<AxiosResponse<ApiResponse>> {
  return Request.post('/api/v1/table',{data:data});
}
