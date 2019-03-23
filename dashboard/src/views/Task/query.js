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
  props: ({ data }) => data,
  options: (props) => {
    return {
      variables: {
        path: props.location.state.currentPath,
      },
    };
  },
});

export const mapDispatchToProps = ({ task: { scriptList }, common: { leftbar } }) => {
  return {
    scriptList,
    leftbar,
  };
};
