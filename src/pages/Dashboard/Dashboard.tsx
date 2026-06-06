import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';

import ProductManagement from '../ProductManagement/ProductManagement';
import UserManagement from '../UserManagement/UserManagement';
import OrderManagement from '../OrderManagement/OrderManagement';
import Overview from '../Overview/Overview';
import OrderHistory from '../OrderHistory/OrderHistory';

const { Header, Content } = Layout;

type MenuKey = 'products' | 'users' | 'orders' | 'overview' | 'myOrders';

interface DashboardProps {
  role: 'admin' | 'USER';
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>(
    role === 'admin' ? 'products' : 'overview'
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const mainMenuItems: MenuProps['items'] =
    role === 'admin'
      ? [
          { key: 'products', label: 'Products Management' },
          { key: 'users', label: 'Users Management' },
          { key: 'orders', label: 'Order Management' },
        ]
      : [
          { key: 'overview', label: 'Overview' },
          { key: 'myOrders', label: 'My Orders' },
        ];

  const renderContent = () => {
    if (role === 'admin') {
      switch (selectedMenu) {
        case 'products': return <ProductManagement />;
        case 'users':    return <UserManagement />;
        case 'orders':   return <OrderManagement />;
        default:         return null;
      }
    } else {
      switch (selectedMenu) {
        case 'overview':  return <Overview />;
        case 'myOrders':  return <OrderHistory />;
        default:          return null;
      }
    }
  };

  const currentLabel =
    (mainMenuItems?.find((item) => item?.key === selectedMenu) as { key: string; label: string } | undefined)?.label ?? '';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
          Dashboard
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedMenu]}
          items={mainMenuItems}
          onClick={(e) => setSelectedMenu(e.key as MenuKey)}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Layout style={{ padding: '24px' }}>
        <Breadcrumb
          items={[{ title: 'Dashboard' }, { title: currentLabel }]}
          style={{ marginBottom: 16 }}
        />
        <Content
          style={{
            padding: 24,
            minHeight: 400,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;