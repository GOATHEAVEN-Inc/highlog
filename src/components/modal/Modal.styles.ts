import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 14, 71, 0.32);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 160ms ease;
`;

export const ModalContainer = styled.div`
  width: 580px;
  min-height: 338px;
  background-color: ${({ theme }) => theme.colors.grayScale["11"]};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.grayScale["09"]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideUp} 200ms ease;
`;

export const Content = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TitleWrapper = styled.div`
  padding: 64px 40px 56px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
`;

export const MainTitle = styled.h2`
  ${({ theme }) => theme.typography.head.H3}
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  margin: 0;
  width: 100%;
  max-width: 100%;
  text-align: center;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const SubTitle = styled.p`
  ${({ theme }) => theme.typography.body.L0}
  color: ${({ theme }) => theme.colors.grayScale["03"]};
  margin: 0;
  width: 100%;
  max-width: 100%;
  text-align: center;
  overflow-wrap: anywhere;
  word-break: break-word;
  max-height: min(40vh, 220px);
  overflow-y: auto;
  padding: 0 4px;
  box-sizing: border-box;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0;
  margin-top: auto;
  padding: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.grayScale["09"]};
`;

const baseModalButton = `
  flex: 1;
  height: 72px;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 160ms ease;
`;

export const LeftButton = styled.button`
  ${baseModalButton}
  ${({ theme }) => theme.typography.body.M2}
  color: ${({ theme }) => theme.colors.grayScale["04"]};
  border-right: 1px solid ${({ theme }) => theme.colors.grayScale["09"]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale["10"]};
  }
`;

export const RightButton = styled.button`
  ${baseModalButton}
  ${({ theme }) => theme.typography.body.M2}
  color: ${({ theme }) => theme.colors.primaryScale["600"]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryScale["50"]};
  }
`;
