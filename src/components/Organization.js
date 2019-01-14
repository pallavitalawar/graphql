import React from 'react';
import { GET_ISSUES_OF_REPOSITORY } from '../queries';
import { Query } from 'react-apollo';
import RepositoryDetails from './RepositoryDetails';
import { UnorderedList, Button } from '../styles/styles';

const updateIssues = (prev, { fetchMoreResult }) => {
  if (!fetchMoreResult) return prev;
  return Object.assign({}, prev, {
    organization: Object.assign({}, prev.organization, {
      repository: Object.assign({}, prev.organization.repository, {
        issues: Object.assign(
          {},
          prev.organization.repository.issues,
          fetchMoreResult.organization.repository.issues,
          {
            edges: [
              ...prev.organization.repository.issues.edges,
              ...fetchMoreResult.organization.repository.issues.edges,
            ],
          },
        ),
      }),
    }),
  });
};

const Organization = ({ path }) => {
  const [organizationLogin, repositoryName] = path.split('/');
  if (organizationLogin && repositoryName) {
    return (
      <Query
        query={GET_ISSUES_OF_REPOSITORY}
        variables={{
          organization: organizationLogin,
          repository: repositoryName,
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading) return 'Loading..';
          if (error) return <p>{error.message}</p>;
          let {
            organization: { repository },
          } = data;

          return (
            <div>
              {!repository && (
                <React.Fragment>
                  No repository with the name <b>{repositoryName}</b> found in
                  organization <b>{organizationLogin}</b>
                </React.Fragment>
              )}
              {repository && (
                <React.Fragment>
                  <RepositoryDetails
                    organization={data.organization}
                    organizationLogin={organizationLogin}
                  />
                  <UnorderedList>
                    {repository.issues.edges.map(issue => (
                      <li key={issue.node.id}>
                        <a href={issue.node.url}>{issue.node.title}</a>
                      </li>
                    ))}
                  </UnorderedList>
                  {repository.issues && repository.issues.pageInfo.hasNextPage && (
                    <Button
                      small
                      primary
                      onClick={() =>
                        fetchMore({
                          variables: {
                            after: repository.issues.pageInfo.endCursor,
                          },
                          updateQuery: updateIssues,
                        })
                      }
                    >
                      More
                    </Button>
                  )}
                </React.Fragment>
              )}
            </div>
          );
        }}
      </Query>
    );
  } else {
    return null;
  }
};

export default Organization;
