import { message } from 'antd';
import { TableData } from './../../interfaces/type';
import { effect, reducer, dvaModel, BaseModel } from 'dva-model-enhance';
import { Table1Model, ApiResponse } from '@/interfaces/type';
import * as tableService from '@/services/api/table';
import { StoreState } from 'umi';

@dvaModel<Table1Model>({
  namespace: 'table1',
  state: {
    data:[],
    loading:false
  },
})
class Index extends BaseModel<Table1Model, StoreState> {
  @reducer
  UpdateState(state: Partial<Table1Model>):Table1Model {
    return {
      ...this.state,
      ...state,
    };
  }

  @effect()
  *GetData():Generator {
    const response = yield this.effects.call(tableService.getData,"table1");
    const res = response as ApiResponse;
    if (res) {
        yield this.effects.put(
            this.UpdateState({
              data: res.data as TableData[],
            }),
          );
    }
  }
  @effect()
  *GenData() :Generator{
    yield this.effects.put(
      this.UpdateState({
          loading: true,
      }),
    );
    const data  = yield this.effects.select(state => state.table1.data);
    const dataType = data as TableData[];
    const response = yield this.effects.call(tableService.genData);
    const res = response as ApiResponse;
    if (res) {
      dataType.push(...res.data as TableData[]);
      yield this.effects.put(
        this.UpdateState({
            data: dataType,
            loading:false
        }),
      );
    }
  }
  @effect()
  *InsertData() :Generator{

    const data  = yield this.effects.select(state => state.table1.data);
    const dataType = data as TableData[];
    const response = yield this.effects.call(tableService.insertData,dataType);
    const res = response as ApiResponse;
    if (res) {
      message.success("save success");
    }
  }
}
export default Index;
