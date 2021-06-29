import React from 'react';
import styled from 'styled-components';

export interface IImg {
  src: string;
  alt: string;
}

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Img: React.FC<IImg> = ({ src, alt }) => {
  return <StyledImg alt={alt} src={src} />;
};
