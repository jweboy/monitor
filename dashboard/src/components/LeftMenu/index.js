import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

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

export default class LeftMenu extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <Sider>
        <Menu theme="dark" mode="inline">
          {data.map((childMenu) => (
            <SubMenu
              key={childMenu.type}
              title={
                <span>
                  {/* for react/jsx-wrap-multilines */}
                  <Icon type="project" />
                  <span>{childMenu.text}</span>
                </span>
              }
            >
              {childMenu.children.map((subMenu) => (
                <MenuItem key={subMenu.type}>
                  <span>{subMenu.text}</span>
                </MenuItem>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    );
  }
}

LeftMenu.defaultProps = {
  data: [
    // {
    //   type: 'task',
    //   text: '任务',
    //   children: [
    //     {
    //       type: 'dev',
    //       text: 'dev',
    //     },
    //   ],
    // },
  ],
};

LeftMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
