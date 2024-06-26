import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        © {new Date().getFullYear()} MyLearning. All Rights Reserved.
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  padding: 1em 2em;
  background-color: #007bff;
  color: white;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const FooterContent = styled.div`
  font-size: 1em;
`;

export default Footer;
