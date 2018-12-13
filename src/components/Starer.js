import React from 'react';
import { Mutation } from 'react-apollo';
import { addStarMutation, removeStarMutation } from '../mutations';
import { getIssuesOfRepositoryQuery } from '../queries';
import { Button } from '../styles/styles';

const Starer = ({
  repositoryId,
  viewerHasStarred,
  organization,
  repository,
}) => {
  let mutation = viewerHasStarred ? removeStarMutation : addStarMutation;
  return (
    <Mutation mutation={mutation}>
      {starer => (
        <Button
          small
          margin
          type='button'
          onClick={() =>
            starer({
              variables: { input: { starrableId: repositoryId } },
              refetchQueries: [
                {
                  query: getIssuesOfRepositoryQuery,
                  variables: { organization, repository },
                },
              ],
            })
          }
        >
          {viewerHasStarred ? 'Unstar' : 'Star'}
        </Button>
      )}
    </Mutation>
  );
};

export default Starer;
