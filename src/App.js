import React, { Component } from "react";
import styled from "styled-components";
import { withApollo } from "react-apollo";
import Header from "./components/Header";
import Organization from "./components/Organization";
import RepositoryForm from "./components/RepositoryForm";

const Main = styled.main`
  font-size: 14px;
  padding: 35px;
`;

const StyledRepositoryForm = styled(RepositoryForm)`
  margin-bottom: 20px;
`;

const TITLE = "Learning GraphQL and Styled Components";

class App extends Component {
  state = {
    path: "the-road-to-learn-react/the-road-to-learn-react",
    organization: "the-road-to-learn-react",
    errors: null
  };

  onChange = event => {
    this.setState({
      path: event.target.value,
      organization: event.target.value.split("/")[0]
    });
  };

  onSubmit = event => {
    // fetch data
    const [organization] = this.state.path.split("/");

    event.preventDefault();
    debugger;
    this.setState({ organization });
  };

  render() {
    const { path, organization } = this.state;
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
          {organization ? (
            <Organization path={path} />
          ) : (
            <p>No information yet ...</p>
          )}
        </Main>
      </div>
    );
  }
}

export default withApollo(App);
