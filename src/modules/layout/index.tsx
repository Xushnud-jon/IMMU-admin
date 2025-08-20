import  { useEffect, useState, Suspense } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
 UserOutlined,
  ReadOutlined,
 TeamOutlined,
 CalendarOutlined,
  GlobalOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Modal, Space, Select, Tooltip, notification } from 'antd';
import { Outlet, useLocation, NavLink, useNavigate } from 'react-router-dom';
import Immulogo from '../../assets/Logo (1).png';
import { removeAccessToken } from '../../utils/token-service'; 
import Loading from '../../components/loadable'; // Ensure correct path for Loading
import { getAccessToken } from '../../utils/token-service'; // Import the getAccessToken function

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken(); // Get the access token
    if (!token) {
      notification.warning({
        message: 'Access Denied',
        description: 'You are being redirected to the login page.',
      });
      navigate('/'); // Redirect to the login page
    }

    const index = admin.findIndex((item) => item.path === pathname);
    if (index !== -1) {
      setSelectedKeys([index.toString()]);
    }
  }, [pathname, navigate]);

  interface AdminType {
    content: string;
    path: string;
    icon: React.ComponentType;
  }

  const admin: AdminType[] = [
    {
      content: "Users",
      path: "/admin-layout",
      icon: UserOutlined,
    },
    {
      content: "Countries",
      path: "/admin-layout/countries",
      icon:  GlobalOutlined,
    },
     {
      content: "Members",
      path: "/admin-layout/members",
      icon: TeamOutlined,
    },
   
   
  ];

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleLogout = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    removeAccessToken(); 
    navigate("/"); 
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='min-h-[100vh]'>
        <div />
        <div style={{
          height: '58px',
          margin: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}>
           <img
    src={Immulogo}
    style={{
      width: collapsed ? '50px' : '170px', // 👈 collapsed bo‘lsa kichrayadi
      height: '60px',
      objectFit: 'contain',
      marginRight: collapsed ? 0 : '10px',
      transition: 'all 0.3s ease', // 👈 animatsiya chiroyli chiqishi uchun
    }}
  />
        
        </div>
     <Menu
  theme="dark"
  mode="inline"
  selectedKeys={selectedKeys}
  items={admin.map((item, index) => ({
    key: index.toString(),
    icon: <item.icon />,
    label: <NavLink to={item.path}>{item.content}</NavLink>,
  }))}
/>
      </Sider>
      <Layout>
        <Header style={{
          padding: 30,
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Space wrap>
            <Select
              defaultValue="en"
              style={{ width: 120 }}
              options={[
                { value: 'en', label: 'English' },
                { value: 'uz', label: 'Uzbek' },
              ]}
            />
            <Tooltip title="Logout" placement="bottom">
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{
                  borderRadius: borderRadiusLG,
                  display: 'flex',
                  alignItems: 'center',
                  height: '40px',
                  padding: '0 16px',
                }}
              />
            </Tooltip>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    <Modal
  title="Confirmation"
  open={isModalVisible}
  onOk={handleOk}
  onCancel={handleCancel}
>
  <p>Are you sure you want to log out?</p>
</Modal>
    </Layout>
  );
};

export default App;
