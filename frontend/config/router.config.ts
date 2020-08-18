export default [
  {
    exact: false,
    path: '/',
    component: '../layouts/BaseLayout',
    routes: [
      { path: '/', exact: true,  component: '../pages/table1', title: 'table1'},
      { path: '/table1', component: '../pages/table1', title: 'table1'},
      { path: '/table2', component: '../pages/table2', title: 'table2'},
      { component: '404' },
    ],
  },

];
