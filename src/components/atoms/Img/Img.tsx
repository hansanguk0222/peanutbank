import React from 'react';
import styled from 'styled-components';

export interface ImgProps {
  src: string;
  alt: string;
}

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Img: React.FC<ImgProps> = ({ src, alt }) => {
  return <StyledImg alt={alt} src={src} />;
};
