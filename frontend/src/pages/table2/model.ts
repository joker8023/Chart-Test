import { TableData } from '../../interfaces/type';
import { effect, reducer, dvaModel, BaseModel } from 'dva-model-enhance';
import { Table2Model, ApiResponse } from '@/interfaces/type';
import * as tableService from '@/services/api/table';
import { StoreState } from 'umi';

@dvaModel<Table2Model>({
  namespace: 'table2',
  state: {
    data:[],
  },
})
class Index extends BaseModel<Table2Model, StoreState> {
  @reducer
  UpdateState(state: Partial<Table2Model>):Table2Model {
    return {
      ...this.state,
      ...state,
    };
  }

  @effect()
  *GetData():Generator {
    const response = yield this.effects.call(tableService.getData,"table2");
    const res = response as ApiResponse;
    if (res) {
        yield this.effects.put(
            this.UpdateState({
              data: res.data as TableData[],
            }),
          );
    }
  }
}
export default Index;
