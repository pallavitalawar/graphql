import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_STAR, REMOVE_STAR } from '../mutations';
import { GET_ISSUES_OF_REPOSITORY } from '../queries';
import { Button } from '../styles/styles';

const Starer = ({
  repositoryId,
  viewerHasStarred,
  organization,
  repository,
}) => {
  let mutation = viewerHasStarred ? REMOVE_STAR : ADD_STAR;
  return (
    <Mutation
      mutation={mutation}
      update={(cache, { data }) => {
        const { organization: org } = cache.readQuery({
          query: GET_ISSUES_OF_REPOSITORY,
          variables: {
            organization,
            repository,
          },
        });
        const { starrable } = viewerHasStarred ? data.removeStar : data.addStar;
        org.repository.viewerHasStarred = starrable.viewerHasStarred;

        cache.writeQuery({
          query: GET_ISSUES_OF_REPOSITORY,
          data: { organization: { ...org } },
          variables: {
            organization,
            repository,
          },
        });
      }}
    >
      {starer => (
        <Button
          small
          margin
          type='button'
          onClick={() =>
            starer({
              variables: { input: { starrableId: repositoryId } },
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
