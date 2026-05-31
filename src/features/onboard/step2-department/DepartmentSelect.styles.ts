import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h4`
  margin: 0;
  text-align: left;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  ${({ theme }) => theme.typography.head.H4};

  @media (max-width: 520px) {
    font-size: 22px;
    line-height: 32px;
  }
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary["00"]};
`;

export const SelectRow = styled.div`
  margin-top: 32px;
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;

  & > *:first-child {
    flex: 1 1 240px;
    min-width: 0;
  }
`;
