import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const DIR_QUERY = gql`
  query Directories($type: String!, $path: String!, $fileName: String!) {
    directories(type: $type, path: $path, fileName: $fileName) {
      currentPath
      childDirs {
        name
        id
      }
    }
  }
`;

export const DIR_MUTATION = gql`
  mutation Directories($type: String!, $path: String!, $fileName: String!) {
    directories(type: $type, path: $path, fileName: $fileName) {
      currentPath
      childDirs {
        name
        id
      }
    }
  }
`;

export const withQuery = graphql(DIR_QUERY, {
  props: ({ data }) => data,
  options: { variables: { type: 'forward', path: '/Users/jianglei/LearnNode/cache' } },
});

export const withMutation = graphql(DIR_MUTATION);

export const mutateDirOption = (option) => {
  return {
    ...option,
    updateQueries: {
      Directories: (previousData, { mutationResult }) => {
        const directories = mutationResult.data.directories;
        previousData.directories = directories;
        return previousData;
      },
    },
  };
};
