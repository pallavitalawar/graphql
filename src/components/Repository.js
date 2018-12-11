import React from "react";
import { getIssuesOfRepositoryQuery } from "../queries";
import { Query } from "react-apollo";

const Repository = ({ repository }) => {
  return (
    <div>
      {repository && (
        <div>
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
                      organization: Object.assign({}, prev.organization, {
                        repository: Object.assign(
                          {},
                          prev.organization.repository,
                          {
                            issues: Object.assign(
                              {},
                              prev.organization.repository.issues,
                              fetchMoreResult.organization.repository.issues,
                              {
                                edges: [
                                  ...prev.organization.repository.issues.edges,
                                  ...fetchMoreResult.organization.repository
                                    .issues.edges
                                ]
                              }
                            )
                          }
                        )
                      })
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
      {!repository && <div>Invalid Repo</div>}
    </div>
  );
};

export default Repository;
