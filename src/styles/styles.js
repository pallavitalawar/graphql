import styled, { css } from 'styled-components';

export const Input = styled.input`
  height: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 14px;
`;

export const Button = styled.button`
  height: ${props => (props.small ? '' : '40px')};
  background: ${props => (props.primary ? '#26a69a' : 'white')};
  border-radius: 3px;
  border: 3px solid #26a69a;
  border-width: ${props => (props.small ? '1px' : '3px')};
  font-size: ${props => (props.small ? '10px' : '14px')};
  color: ${props => (props.primary ? 'white' : '#26a69a')};
  padding: ${props => (props.small ? '5px' : '10px 25px')};

  ${props =>
    props.margin &&
    css`
      margin: 0px 10px;
    `}
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;

  small {
    font-weight: normal;
    font-size: 0.7em;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const DisplayValue = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  label {
    color: gray;
    margin-bottom: 5px;
  }
  span {
    font-size: 18px;
  }
`;

export const UnorderedList = styled.ul`
  padding: 0;
  list-style-position: inside;

  li {
    margin-bottom: 5px;
  }
`;
