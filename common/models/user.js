import {
  fetchList
} from '../services/user';

export default {
  namespace: 'user',
  state: [],
  reducers: {
    save(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *fetchList(action, { call, put }) {
      const result = yield call(fetchList);
      yield put({
        type: 'save',
        payload: result,
      });
    },
  },
  getInitialState() {
    return new Promise((resolve, reject) => {
      fetchList().then(({data})=>{resolve({user: data})},(e)=>{reject(e)})
    });
  }
}
