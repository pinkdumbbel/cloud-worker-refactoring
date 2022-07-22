import useRegionModel from '@/api/models/useRegion';
import { Close } from '@/assets/icons';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import CityScroll from './CityScroll';
import DistrictScroll from './DistrictScroll';

const RegionContentBox = () => {
  const { region, getRegionData } = useRegionModel();

  useEffect(() => {
    getRegionData();
  }, []);

  if (!Object.keys(region).length) return null;
  return (
    <Wrapper>
      <TitleContainer>
        <IconContainer>
          <Close />
        </IconContainer>
        <TitleText>거주지역 선택</TitleText>
      </TitleContainer>

      <RegionTitleContainer>
        <CityTitleContainer>
          <TitleText>시/도</TitleText>
        </CityTitleContainer>
        <DistrictTitleContainer>
          <TitleText>시/구/군</TitleText>
        </DistrictTitleContainer>
      </RegionTitleContainer>

      <RegionScrollContainer>
        <CityScroll cities={Object.keys(region)} />
        {/* <DistrictScroll districts={Object.entries(region)} /> */}
      </RegionScrollContainer>

      <ButtonWrapper>
        <RoundedButton>확인</RoundedButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default RegionContentBox;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  max-width: 550px;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-color: ${({ theme }) => theme.color.background.white};
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.lightgray};
`;

const IconContainer = styled.div`
  position: absolute;
  left: 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.color.font.gray};
  cursor: pointer;

  &:hover {
    opacity: 0.4;
  }
`;
const TitleText = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

const RegionTitleContainer = styled.div`
  width: 100%;
  display: flex;

  padding: 30px 10px;
`;

const CityTitleContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const DistrictTitleContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const RegionScrollContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  padding: 10px;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  padding: 30px 10px 0px 10px;
  flex-grow: 1;
`;

const RoundedButton = styled.button`
  width: 100%;
  padding: 15px 0px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.button.darkbrown};
  color: ${({ theme }) => theme.color.font.white};
  font-weight: bold;
`;
