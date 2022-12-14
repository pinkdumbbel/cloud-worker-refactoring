import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Content>
        <h1>Landing Page</h1>
        <ButtonWrapper>
          <button onClick={() => navigate('/apply')}>
            ๐ ์ง์ํ๊ธฐ ํ์ด์ง๋ก ์ด๋ํ๊ธฐ
          </button>
          <button onClick={() => navigate('/login')}>
            ๐ถ ์ด๋๋ฏผ ๋ก๊ทธ์ธ ํ์ด์ง๋ก ์ด๋ํ๊ธฐ
          </button>
        </ButtonWrapper>
      </Content>
    </Wrapper>
  );
};

export default LandingPage;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox()};
  height: 100%;
`;
const Content = styled.div`
  width: 430px;

  padding-bottom: 30px;
  text-align: center;

  h1 {
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: -2px;
    margin-bottom: 20px;
  }
`;
const ButtonWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox('center', 'space-between')};
  height: 30px;

  button {
    height: 100%;
  }
`;
