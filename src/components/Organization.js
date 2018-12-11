import React from "react";
import { getIssuesOfRepositoryQuery } from "../queries";
import { Query } from "react-apollo";
import Starer from "./Starer";
import {
  Label,
  DisplayValue,
  FlexContainer,
  UnorderedList,
  Button
} from "../styles/styles";

const RepositoryDetails = ({
  organization,
  organizationName,
  repositoryName
}) => (
  <React.Fragment>
    <FlexContainer>
      <DisplayValue>
        <Label>Organization:</Label> <span>{organization.name}</span>
      </DisplayValue>
      <DisplayValue>
        <Label>Repository:</Label>
        <span>
          {organization.repository.name}
          <Starer
            viewerHasStarred={organization.repository.viewerHasStarred}
            repositoryId={organization.repository.id}
            organization={organizationName}
            repository={repositoryName}
          />
        </span>
      </DisplayValue>
    </FlexContainer>
  </React.Fragment>
);

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
              ...fetchMoreResult.organization.repository.issues.edges
            ]
          }
        )
      })
    })
  });
};

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
                <React.Fragment>
                  No repository with the name <b>{repositoryName}</b> found in
                  organization <b>{organizationName}</b>
                </React.Fragment>
              )}
              {repository && (
                <React.Fragment>
                  <RepositoryDetails
                    organization={data.organization}
                    organizationName={organizationName}
                    repositoryName={repositoryName}
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
                            after: repository.issues.pageInfo.endCursor
                          },
                          updateQuery: updateIssues
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
