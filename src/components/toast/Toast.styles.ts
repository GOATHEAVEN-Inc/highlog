import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 12px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  width: min(1200px, calc(100vw - 48px));
  background-color: ${({ theme }) => theme.colors.grayScale["01"]};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 1100;
  animation: ${slideUp} 200ms ease;
`;

export const Content = styled.div`
  width: 100%;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
`;

export const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primaryScale["300"]};
`;

export const Message = styled.span`
  flex: 1;
  ${({ theme }) => theme.typography.body.S1}
  color: ${({ theme }) => theme.colors.grayScale["10"]};
`;

export const CloseButton = styled.button`
  width: 28px;
  height: 28px;
  padding: 0;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.radius.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.grayScale["07"]};
  transition: background-color 160ms ease, color 160ms ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    color: ${({ theme }) => theme.colors.grayScale["10"]};
  }

  & svg {
    width: 18px;
    height: 18px;
  }

  & svg path {
    stroke: currentColor;
  }
`;
