import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const DIR_QUERY = gql`
  query Dir {
    dirs {
      name
      id
    }
  }
`;

export const DIR_MUTATION = gql`
  mutation currentDirs($type: String) {
    currentDirs(type: "forward") {
      name
      id
    }
  }
`;

export const withQuery = graphql(DIR_QUERY, {
  props: ({ data }) => ({ ...data }),
});

export const withMutation = graphql(DIR_MUTATION);
