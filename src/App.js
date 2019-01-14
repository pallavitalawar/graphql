import React, { Component } from 'react';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';
import Header from './components/Header';
import Organization from './components/Organization';
import RepositoryForm from './components/RepositoryForm';

const Main = styled.main`
  font-size: 14px;
  padding: 35px;
`;

const StyledRepositoryForm = styled(RepositoryForm)`
  margin-bottom: 20px;
`;

const TITLE = 'Learning GraphQL and Styled Components';

const setPath = value => {
  return function update() {
    return {
      path: value,
    };
  };
};

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
  };

  onChange = event => {
    this.setState(setPath(event.target.value));
  };

  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { path } = this.state;
    return (
      <div>
        <Header title={TITLE} />
        <Main>
          <StyledRepositoryForm
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            path={path}
          />
          {/* Here comes the result! */}
          {path ? <Organization path={path} /> : <p>No information yet ...</p>}
        </Main>
      </div>
    );
  }
}

export default withApollo(App);
