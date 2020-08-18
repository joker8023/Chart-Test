/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { actions } from 'umi';
import { useDispatch as useEnhanceDispatch } from 'dva-model-enhance';


export default ()=> useEnhanceDispatch(actions);
