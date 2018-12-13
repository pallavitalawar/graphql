import gql from 'graphql-tag';

export const addStarMutation = gql`
  mutation addStar($input: AddStarInput!) {
    addStar(input: $input) {
      clientMutationId
    }
  }
`;
export const removeStarMutation = gql`
  mutation removeStar($input: RemoveStarInput!) {
    removeStar(input: $input) {
      clientMutationId
    }
  }
`;
