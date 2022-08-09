import React from 'react';
import styled from 'styled-components';
import { TransportationList, Label } from '@/components';
import { InputNameType } from '@/@types/enum';

interface ApplyTransportationProps {
  title: string;
  description: string;
  name: InputNameType;
}
const ApplyTransportation = ({
  title,
  description,
  name,
}: ApplyTransportationProps) => {
  return (
    <>
      <Label title={title} description={description} />
      <StyledTransportationList name={name} />
    </>
  );
};

export default ApplyTransportation;

const StyledTransportationList = styled(TransportationList)`
  margin-top: 10px;
  margin-bottom: 30px;
`;
