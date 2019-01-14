import gql from 'graphql-tag';

export const GET_VIEWER = gql`
  {
    viewer {
      login
    }
  }
`;

export const GET_ORGANIZATION = gql`
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

export const GET_REPOSITORY_OF_ORGANISATON = gql`
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
      repository(name: "the-road-to-learn-react") {
        name
        url
      }
    }
  }
`;

export const GET_ISSUES_OF_REPOSITORY = gql`
  query getIssuesOfRepo(
    $organization: String!
    $repository: String!
    $after: String
  ) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        viewerHasStarred
        issues(first: 5, after: $after) {
          edges {
            node {
              id
              title
              url
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
          totalCount
        }
      }
    }
  }
`;
