import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const { SubMenu } = Menu;
const { Sider } = Layout;
const MenuItem = Menu.Item;

// const MySubMenu = ({ children, title, key }) => (
//   <div>
//     <SubMenu key={key} title={title}>
//       {children}
//     </SubMenu>
//   </div>
// );

// class MySubMenu extends PureComponent {
//   render() {
//     const { children, title, key } = this.props;
//     return (
//       <SubMenu key={key} title={title}>
//         {children}
//       </SubMenu>
//     );
//   }
// }

@connect((state) => ({
  data: state.common.leftbar,
}))
class LeftBar extends Component {
  render() {
    const { data } = this.props;
    // console.warn('render menu', data);
    return (
      <Sider>
        <Menu theme="dark" mode="inline">
          {data.map((childMenu) => (
            <SubMenu
              key={childMenu.type}
              title={
                <span>
                  <Icon type="project" />
                  <span>{childMenu.name}</span>
                </span>
              }
            >
              {childMenu.children.map((subMenu) => (
                <MenuItem key={subMenu.id}>
                  <span>{subMenu.name}</span>
                </MenuItem>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    );
  }
}

LeftBar.defaultProps = {
  data: [],
};

LeftBar.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          value: PropTypes.string,
          id: PropTypes.string,
        })
      ),
    })
  ),
};

export default LeftBar;
