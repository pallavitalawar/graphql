import React, { Component } from "react";
import styled from "styled-components";
import { withApollo } from "react-apollo";
import Header from "./components/Header";
import Organization from "./components/Organization";

const Button = styled.button`
  background: ${props => (props.primary ? "#26a69a" : "white")};
  border-radius: 3px;
  border: 2px solid #26a69a;
  color: ${props => (props.primary ? "white" : "#26a69a")};
  margin: 0 1em;
  padding: 0.25em 1em;
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

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show open issues for https://github.com/</label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            style={{ width: "300px" }}
          />
          <Button type="submit" primary>
            Search
          </Button>
        </form>

        <hr />

        {/* Here comes the result! */}
        {organization ? (
          <Organization path={path} />
        ) : (
          <p>No information yet ...</p>
        )}
      </div>
    );
  }
}

export default withApollo(App);
