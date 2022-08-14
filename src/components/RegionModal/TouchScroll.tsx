import React, { useEffect, useState } from 'react';
import useRegionModel from '@/api/models/useRegionModel';
import { DEFAULT_SELECTED_CITY } from '@/constants';
import styled from 'styled-components';
import Loading from '../Loading';

import { useRecoilState } from 'recoil';
import { applicantRegionState } from '@/recoil/atoms';

const TouchScroll = () => {
  const { regions, getRegionData } = useRegionModel();
  const [applicantRegion, setApplicantRegion] =
    useRecoilState(applicantRegionState);

  const onClickCity = (city: string) => {
    if (applicantRegion.city === city) return;

    setApplicantRegion((prevRegion) => ({ ...prevRegion, city }));
  };

  const onClickDistrict = (district: string) => {
    if (applicantRegion.district === district) return;

    setApplicantRegion((prevRegion) => ({ ...prevRegion, district }));
  };

  useEffect(() => {
    getRegionData();
  }, []);

  if (!Object.keys(regions).length) return <Loading />;

  return (
    <Wrapper>
      <ScrollWrapper>
        {Object.keys(regions).map((city) => (
          <ScrollItem
            key={city}
            onClick={() => onClickCity(city)}
            isActive={city === applicantRegion.city}
          >
            <ScrollItemTitle>{city}</ScrollItemTitle>
          </ScrollItem>
        ))}
      </ScrollWrapper>
      <ScrollWrapper>
        {regions[applicantRegion.city].map((district) => (
          <ScrollItem
            key={district}
            onClick={() => onClickDistrict(district)}
            isActive={applicantRegion.district === district}
          >
            <ScrollItemTitle>{district}</ScrollItemTitle>
          </ScrollItem>
        ))}
      </ScrollWrapper>
    </Wrapper>
  );
};

export default TouchScroll;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  padding: 10px;
  gap: 10px;
`;

const ScrollWrapper = styled.ul`
  width: 50%;
  height: 100%;
  ${({ theme }) => theme.mixins.scrollSnap.parent()}
  ${({ theme }) => theme.mixins.noScrollBar}
`;

const ScrollItem = styled.li<{ isActive: boolean }>`
  ${({ theme }) => theme.mixins.flexBox()}
  width: 100%;
  height: calc(100% / 3);
  cursor: pointer;
  ${({ theme }) => theme.mixins.scrollSnap.child()}
  &:hover {
    background-color: ${({ theme }) => theme.color.background.lightgray};
  }
  background-color: ${({ isActive, theme }) =>
    isActive && theme.color.background.lightgray};
`;

const ScrollItemTitle = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;
