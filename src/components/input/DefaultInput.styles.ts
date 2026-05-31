import styled from "styled-components";

export const DefaultInputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 832px;
  padding: 10px 16px;
  align-items: center;
  gap: 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.grayScale["10"]};
  border: 1px solid ${({ theme }) => theme.colors.grayScale["09"]};
  transition: border-color ${({ theme }) => theme.transitions.base},
    background-color ${({ theme }) => theme.transitions.base};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primaryScale["400"]};
    background-color: ${({ theme }) => theme.colors.grayScale["11"]};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

export const Title = styled.input`
  ${({ theme }) => theme.typography.body.M0};
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.grayScale["00"]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale["05"]};
  }
`;
