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
  props: ({ data }) => ({ ...data }),
  options: { variables: { path: '/home/jweboy/Projects/MyGithubRepos/monitor' } },
});

export const mapDispatchToProps = (dispatch) => {
  const updateMenuList = (path) => {
    dispatch(path);
  };
  return {
    updateMenuList,
  };
};
