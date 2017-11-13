export default {
  namespace: 'group',
  state: [],
  reducers: {
    
  },
  effects: {
    
  },
  getInitialState() {
    return new Promise((resolve, reject) => {
      resolve({group: [{id:1, group: 'group1'}, {id:2, group: 'group2'}]});
    });
  }
}
