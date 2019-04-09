import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
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
  handleClick = (item) => () => {
    const { mutate, location, currentProcessStatus, isKilled } = this.props;
    console.warn(isKilled);
    mutate({
      variables: {
        path: location.state.currentPath,
        script: item.value,
      },
    }).then((data) => {
      console.warn(data);
      // currentProcessStatus(false);
    });
  };
  render() {
    const { data } = this.props;
    // console.log(this.props);
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
                <MenuItem key={subMenu.id} onClick={this.handleClick(subMenu)}>
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
};

export default LeftBar;
