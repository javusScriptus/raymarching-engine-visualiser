import styled from 'styled-components';

import { media } from 'utils/media';
import { underline, s1 } from 'utils/sharedStyled';

export const GithubWrapper = styled.div`
  position: fixed;
  z-index: 20;
  top: 20px;
  right: 30px;
`;

export const AuthorWrapper = styled.div`
  display: none;

  ${media.tablet} {
    display: initial;
    position: fixed;
    z-index: 20;
    bottom: 20px;
    right: 30px;
    display: flex;
    align-items: center;
    ${s1};
  }
`;

export const GithubLink = styled.span`
  display: inline-block;
  position: relative;
  ${s1};
  ${underline};
`;

export const AuthorLink = styled.span`
  display: inline-block;
  font-weight: 800;
  position: relative;
  ${underline};
  margin-left: 5px;
`;
