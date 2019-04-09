import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const STREAM_MUTATION = gql`
  mutation listenStream($script: String, $path: String) {
    listenStream(path: $path, script: $script) {
      data
      killed
    }
  }
`;

export const wihtMutation = graphql(STREAM_MUTATION);

export const mapDispatchToProps = ({ task: { currentProcessStatus } }) => {
  return {
    currentProcessStatus,
  };
};
