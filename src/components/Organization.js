import React from "react";
import { getIssuesOfRepositoryQuery } from "../queries";
import { Query } from "react-apollo";

const RepositoryDetails = ({ organization }) => (
  <div>Organization: {organization.name}</div>
);

const Organization = ({ path }) => {
  const [organizationName, repositoryName] = path.split("/");
  if (organizationName && repositoryName) {
    return (
      <Query
        query={getIssuesOfRepositoryQuery}
        variables={{
          organization: organizationName,
          repository: repositoryName
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading) return "Loading..";
          if (error) return <p>{error.message}</p>;
          let {
            organization: { repository }
          } = data;

          return (
            <div>
              {!repository && (
                <div>
                  No repository with the name <b>{repositoryName}</b> found in
                  organization <b>{organizationName}</b>
                </div>
              )}
              {repository && (
                <div>
                  <RepositoryDetails organization={data.organization} />
                  <ul>
                    {repository.issues.edges.map(issue => (
                      <li key={issue.node.id}>
                        <a href={issue.node.url}>{issue.node.title}</a>
                      </li>
                    ))}
                  </ul>
                  {repository.issues && repository.issues.pageInfo.hasNextPage && (
                    <button
                      onClick={() =>
                        fetchMore({
                          variables: {
                            after: repository.issues.pageInfo.endCursor
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              organization: Object.assign(
                                {},
                                prev.organization,
                                {
                                  repository: Object.assign(
                                    {},
                                    prev.organization.repository,
                                    {
                                      issues: Object.assign(
                                        {},
                                        prev.organization.repository.issues,
                                        fetchMoreResult.organization.repository
                                          .issues,
                                        {
                                          edges: [
                                            ...prev.organization.repository
                                              .issues.edges,
                                            ...fetchMoreResult.organization
                                              .repository.issues.edges
                                          ]
                                        }
                                      )
                                    }
                                  )
                                }
                              )
                            });
                          }
                        })
                      }
                    >
                      More
                    </button>
                  )}
                </div>
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
