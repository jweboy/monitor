import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const DIR_QUERY = gql`
  query Directories($type: String!, $path: String, $fileName: String) {
    directories(type: $type, path: $path, fileName: $fileName) {
      currentPath
      childDirs {
        name
        id
        currentPath
      }
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
  options: { variables: { type: 'forward' } },
});

export const withMutation = graphql(DIR_MUTATION);
