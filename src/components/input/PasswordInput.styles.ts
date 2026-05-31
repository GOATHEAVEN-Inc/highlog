import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 44px 14px 14px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.grayScale["11"]};
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  border-radius: ${({ theme }) => theme.radius.sm};
  ${({ theme }) => theme.typography.body.S0};
  line-height: 20px;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  transition: border-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base};

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale["05"]};
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ theme }) => theme.colors.grayScale["07"]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryScale["400"]};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.grayScale["10"]};
    color: ${({ theme }) => theme.colors.grayScale["05"]};
  }
`;

export const EyeButton = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin: 0;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.radius.xs};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grayScale["05"]};
  transition: color ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.grayScale["02"]};
  }
`;
