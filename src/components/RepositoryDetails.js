import React from 'react';
import Starer from './Starer';
import { Label, DisplayValue, FlexContainer } from '../styles/styles';

const RepositoryDetails = ({ organization, organizationLogin }) => (
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
            organization={organizationLogin}
            repository={organization.repository.name}
          />
        </span>
      </DisplayValue>
    </FlexContainer>
  </React.Fragment>
);

export default RepositoryDetails;
