import React from 'react';
import styled from 'styled-components';

const PageHeader = styled.div`
  padding: 35px;
  background: #26a69a;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 24px;
  color: #fff;
`;

const Header = ({ title }) => {
  return (
    <PageHeader>
      <Title>{title}</Title>
    </PageHeader>
  );
};

export default Header;
