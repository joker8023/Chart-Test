import {
  useSelector as reactReduxUseSelector,
  shallowEqual,
} from 'react-redux';
import { StoreState } from 'umi';

export interface Selector<TState, TSelected> {
  (state: TState): TSelected;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSelector = <TState extends StoreState, TSelected>(
  selector: Selector<TState, TSelected>,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) => {
  return reactReduxUseSelector<TState, TSelected>(
    selector,
    equalityFn || shallowEqual,
  );
};

export default useSelector;
