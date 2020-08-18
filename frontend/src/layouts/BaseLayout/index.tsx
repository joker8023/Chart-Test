import React, { useState } from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import { StoreState, history, useLocation } from 'umi';
import { PieChartOutlined } from '@ant-design/icons';

const MenuLayout: React.FC<StoreState> = (Props) => {
  const { children } = Props;
  const { Sider, Content } = Layout;
  const pathname = useLocation().pathname.replaceAll('/', '');
  const [current, setCurrent] = useState(pathname);

  const goto = (key: string) => {
    setCurrent(key);
    history.push(key);
  };

  return (
    <ConfigProvider>
      <Layout style={{height:"100vh"}}>
        <Sider>
          <Menu selectedKeys={[current]} theme="dark" mode="inline">
            <Menu.Item
              key="table1"
              icon={<PieChartOutlined />}
              onClick={(e) => goto(e.key.toString())}
            >
              table1
            </Menu.Item>
            <Menu.Item
              key="table2"
              icon={<PieChartOutlined />}
              onClick={(e) => goto(e.key.toString())}
            >
              table2
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MenuLayout;
