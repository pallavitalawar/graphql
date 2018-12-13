import gql from 'graphql-tag';

export const ADD_STAR = gql`
  mutation addStar($input: AddStarInput!) {
    addStar(input: $input) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;
export const REMOVE_STAR = gql`
  mutation removeStar($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;
