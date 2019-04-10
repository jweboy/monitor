import React, { Component } from 'react';
import { Layout, Menu, Icon, message } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { wihtMutation, mapDispatchToProps } from './graphql';

const { SubMenu } = Menu;
const { Sider } = Layout;
const MenuItem = Menu.Item;

@wihtMutation
@connect(
  (state) => ({
    data: state.common.leftbar,
    isKilled: state.task.isKilled,
  }),
  mapDispatchToProps
)
class LeftBar extends Component {
  state = {
    activeItem: {
      name: '',
      value: '',
    },
    isKilled: true,
    selectedKeys: [],
  };
  static getDerivedStateFromProps(props, state) {
    const { currentProcessStatus } = props;

    // 组件初始化 dispatch 一个 isKilled 状态用于设置菜单项的选中状态
    currentProcessStatus(false);

    // 监听停止按钮 dispatch 的 kill 状态，并清空菜单项的选中状态
    if (props.isKilled !== state.isKilled) {
      return {
        isKilled: props.isKilled,
        selectedKeys: [],
      };
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    const { activeItem } = this.state;
    const { currentProcessStatus } = this.props;

    // 监听不同菜单项的 mutation 和 dispatch 事件
    if (prevState.activeItem !== activeItem) {
      const { mutate, location } = this.props;
      mutate({
        variables: {
          path: location.state.currentPath,
          script: activeItem.value,
        },
      }).then(() => {
        currentProcessStatus(false);
      });
    }
  }
  handleSelect = ({ item, key, selectedKeys }) => {
    const { isKilled, selectedKeys: prevSelectedKeys } = this.state;
    const activeItem = {
      name: key,
      value: item.props.value,
    };

    // 如果当前选中的菜单项已开启了进程监听，需要先关闭当前进程流才能进行后续操作。
    if (prevSelectedKeys !== selectedKeys && prevSelectedKeys.length > 0 && !isKilled) {
      return message.error(`请先关闭 ${prevSelectedKeys} 启动的进程`);
    }

    this.setState({ selectedKeys, activeItem });
  };
  render() {
    const { data } = this.props;
    const { selectedKeys } = this.state;
    // console.log('render menu', activeItem);
    return (
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={['task']}
          onSelect={this.handleSelect}
        >
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
                <MenuItem key={subMenu.name} value={subMenu.value}>
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
  mutate: () => {},
  location: {},
  currentProcessStatus: () => {},
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
  mutate: PropTypes.func,
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
  currentProcessStatus: PropTypes.func,
};

export default LeftBar;
