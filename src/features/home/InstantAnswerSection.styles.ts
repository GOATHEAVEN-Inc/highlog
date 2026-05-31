import styled, { keyframes } from "styled-components";

// 홈 최상단 1-line QnA 바. 가벼운 컨테이너 + 결과 카드는 그 아래.

export const Section = styled.section`
  width: 100%;
  padding: max(36px, 2.5vw) max(24px, 1.67vw) 12px;
  background: linear-gradient(180deg, #f5f6ff 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 640px) {
    padding: 20px 16px 16px;
  }
`;

export const Form = styled.form`
  width: 100%;
  max-width: 980px;
  display: flex;
  gap: 10px;
  align-items: stretch;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const InputWrapper = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.span`
  position: absolute;
  left: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary["00"]};
  pointer-events: none;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px 20px 15px 48px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  ${({ theme }) => theme.typography.body.M0};
  font-family: inherit;
  background: #fff;
  box-shadow: 0 2px 12px rgba(60, 50, 200, 0.05);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary["00"]};
    box-shadow: 0 4px 18px rgba(60, 50, 200, 0.12);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale["04"]};
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${spin} 0.9s linear infinite;
`;

export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 22px;
  height: 50px;
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => theme.colors.primary["00"]};
  color: #fff;
  ${({ theme }) => theme.typography.body.L2};
  font-size: 16px;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.05s ease, box-shadow 0.15s ease;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(60, 50, 200, 0.18);

  @media (max-width: 640px) {
    width: 100%;
    height: 46px;
    font-size: 15px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  &:not(:disabled):hover {
    /* 살짝 더 진한 톤으로 호버 */
    filter: brightness(0.95);
    box-shadow: 0 4px 16px rgba(60, 50, 200, 0.25);
  }

  &:not(:disabled):active {
    transform: translateY(1px);
  }

  svg {
    flex-shrink: 0;
  }
`;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ChipRow = styled.div`
  margin-top: 12px;
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

export const Chip = styled.button`
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  background: #fff;
  color: ${({ theme }) => theme.colors.grayScale["02"]};
  ${({ theme }) => theme.typography.body.S0};
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;

  @media (max-width: 640px) {
    padding: 6px 12px;
    font-size: 12px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary["00"]};
    color: ${({ theme }) => theme.colors.primary["00"]};
    background: #f5f6ff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ChipLabel = styled.span`
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.grayScale["04"]};
  ${({ theme }) => theme.typography.body.S0};
`;

export const ErrorBanner = styled.div`
  margin-top: 14px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #fff5f5;
  border: 1px solid #ffe0e0;
  color: #c0392b;
  ${({ theme }) => theme.typography.body.S0};
  max-width: 980px;
  width: 100%;
  animation: ${fadeUp} 0.25s ease-out;
`;

export const ResultWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 980px;
  animation: ${fadeUp} 0.35s ease-out;
`;
