import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
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

export const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

export const ActionRow = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: flex-start;
`;
