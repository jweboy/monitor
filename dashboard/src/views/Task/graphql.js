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

export const STREAM_SUBSCRIPTION = gql`
  subscription streamListened {
    streamListened {
      data
      killed
    }
  }
`;

export const TASK_KILL_SUBSCRIPTION = gql`
  subscription taskKilled {
    taskKilled {
      data
      killed
    }
  }
`;

export const STREAM_MUTATION = gql`
  mutation killStream {
    killStream {
      data
      killed
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

export const withMutation = graphql(STREAM_MUTATION);

export const withSubscription = graphql(STREAM_SUBSCRIPTION, {
  props: ({ data }) => data,
});

export const subscribeTerminateTask = graphql(TASK_KILL_SUBSCRIPTION, {
  props: ({ data }) => data,
});

export const mapDispatchToProps = ({ task: { scriptList, currentProcessStatus }, common: { leftbar } }) => {
  return {
    currentProcessStatus,
    scriptList,
    leftbar,
  };
};