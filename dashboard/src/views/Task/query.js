import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const SCRIPT_QUERY = gql`
  query Scripts($path: String!) {
    scripts(path: $path) {
      name
      value
      id
    }
  }
`;

export const withQuery = graphql(SCRIPT_QUERY, {
  props: ({ ownProps, data }) => {
    return {
      ...data,
      dispatchMenuChild: ownProps.scriptList,
      dispatchMenu: ownProps.leftbar,
    };
  },
  options: { variables: { path: '/Users/jianglei/GithubProjects/monitor' } },
});

export const mapDispatchToProps = ({ task: { scriptList }, common: { leftbar } }) => {
  return {
    scriptList,
    leftbar,
  };
};
