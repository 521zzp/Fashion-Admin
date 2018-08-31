import { Component } from 'react';
import { Layout, Icon, message, Button, Popconfirm } from 'antd';
import SiderMenu from "../components/SiderMenu/SiderMenu";
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.svg';

const { Content, Header, Footer } = Layout;

class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
		this.props.dispatch({
			type: 'login/logout',
			payload: {
				msg: '您已成功退出！'
			}
		})
	}

  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout>
        <SiderMenu
          logo={logo}
          collapsed={collapsed}
          menuData={getMenuData()}
          location={location}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0, backgroundColor: '#fff' }}>
          	<div style={{ float: 'right', marginRight: '60px' }}>
					    	<Popconfirm title="确认退出系统" okText="退出" cancelText="取消" placement="bottom" onConfirm={ this.logout }>
								<Button type="primary" shape="circle" icon="logout"/>
							</Popconfirm>
				    </div>
          </Header>
          <Content style={{ margin: '18px 18px 0', height: '100%' }}>
            { children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
