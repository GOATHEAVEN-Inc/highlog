import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
`;

export const PracticeStep2Container = styled.div`
  display: flex;
  padding: 48px 38px 70px 38px;
  flex-direction: column;
  align-items: flex-end;
  gap: 74px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.colors.grayScale["11"]};
  border-radius: 12px;
`;

export const PracticeWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
`;

export const TimerResetBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const TimerBox = styled.div`
  display: flex;
  padding: 16px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.secondary["09"]};
`;

export const Timer = styled.p`
  ${({ theme }) => theme.typography.body.S1};
  color: ${({ theme }) => theme.colors.grayScale["00"]};
`;

export const ChattingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: clamp(420px, 56vh, 560px);
  align-self: stretch;
  padding: 24px clamp(16px, 3vw, 28px);
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  background-color: ${({ theme }) => theme.colors.grayScale["10"]};
  gap: 18px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grayScale["08"]};
    border-radius: 8px;
  }
`;

/** AI 메시지 한 줄: 아바타 + 말풍선 */
export const AIChatRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  align-self: flex-start;
  max-width: 82%;
`;

export const InterviewerAvatar = styled.div`
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: linear-gradient(
    150deg,
    ${({ theme }) => theme.colors.primaryScale["500"]},
    ${({ theme }) => theme.colors.primaryScale["700"]}
  );
`;

export const AIChatBox = styled.div`
  display: flex;
  padding: 14px 18px;
  align-items: center;
  border-radius: 4px 18px 18px 18px;
  background-color: ${({ theme }) => theme.colors.grayScale["11"]};
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  box-shadow: ${({ theme }) => theme.shadows.xs};
`;

export const AIChatText = styled.div`
  ${({ theme }) => theme.typography.body.M0};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
`;

export const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  height: 24px;

  span {
    width: 6px;
    height: 6px;
    background-color: ${({ theme }) => theme.colors.grayScale["05"]};
    border-radius: 50%;
    display: inline-block;
    animation: ${bounce} 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
`;

export const UserChatBox = styled.div`
  display: flex;
  padding: 14px 18px;
  align-items: center;
  border-radius: 18px 4px 18px 18px;
  background-color: ${({ theme }) => theme.colors.primary["00"]};
  align-self: flex-end;
  max-width: 82%;
  box-shadow: 0 4px 12px -4px rgba(90, 92, 245, 0.45);
`;

export const UserChatText = styled.div`
  ${({ theme }) => theme.typography.body.M0};
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.grayScale["11"]};
`;

export const AnswerButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  align-self: stretch;
  gap: 12px;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

export const AnswerBox = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  padding: 4px 8px 4px 20px;
  align-items: center;
  gap: 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  background-color: ${({ theme }) => theme.colors.grayScale["11"]};
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary["00"]};
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

export const AnswerInput = styled.input`
  width: 100%;
  height: 52px;
  ${({ theme }) => theme.typography.body.M0};
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale["05"]};
  }
`;
