import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: 48px 24px 96px;
`;

export const HeaderSection = styled.div`
  margin-bottom: 28px;
`;

export const Eyebrow = styled.p`
  ${({ theme }) => theme.typography.body.S0};
  color: ${({ theme }) => theme.colors.primary["00"]};
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: 0.02em;
`;

export const Description = styled.p`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.grayScale["03"]};
  ${({ theme }) => theme.typography.body.M0};
  line-height: 1.6;
`;

export const FormCard = styled.section`
  background: #fff;
  border: 1px solid #eef0fa;
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 8px 32px rgba(60, 50, 200, 0.06);
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldLabel = styled.label`
  ${({ theme }) => theme.typography.body.M0};
  color: ${({ theme }) => theme.colors.grayScale["02"]};
  font-weight: 600;
`;

export const TextAreaWrapper = styled.div`
  position: relative;
`;

export const TextAreaIcon = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
  color: ${({ theme }) => theme.colors.primary["00"]};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 14px 16px 14px 44px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  resize: vertical;
  ${({ theme }) => theme.typography.body.M0};
  font-family: inherit;
  background: #fafbff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary["00"]};
    background: #fff;
    box-shadow: 0 0 0 4px rgba(99, 91, 255, 0.08);
  }
`;

export const OptionalRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const Input = styled.input`
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale["08"]};
  ${({ theme }) => theme.typography.body.M0};
  font-family: inherit;
  background: #fafbff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary["00"]};
    background: #fff;
    box-shadow: 0 0 0 4px rgba(99, 91, 255, 0.08);
  }
`;

// 토글 그룹 — 길이·말투·면접 유형 선택용 칩 라디오
export const ChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ChipButton = styled.button<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active
        ? theme.colors.primary["00"]
        : theme.colors.grayScale["08"]};
  background: ${({ $active }) => ($active ? "#f0f0ff" : "#fff")};
  color: ${({ theme, $active }) =>
    $active
      ? theme.colors.primary["00"]
      : theme.colors.grayScale["02"]};
  ${({ theme }) => theme.typography.body.S0};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary["00"]};
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
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.colors.primary["00"]};
  color: #fff;
  ${({ theme }) => theme.typography.body.L2};
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.05s ease, box-shadow 0.15s ease;
  box-shadow: 0 2px 10px rgba(60, 50, 200, 0.18);

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }

  &:not(:disabled):hover {
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
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ── 결과 영역 ─────────────────────────────────────────────────────────────

export const ResultWrapper = styled.section`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeUp} 0.35s ease-out;
`;

export const ResultCard = styled.div<{ $accent?: "primary" | "neutral" | "warn" }>`
  background: #fff;
  border: 1px solid
    ${({ $accent }) =>
      $accent === "warn"
        ? "#ffe0e0"
        : $accent === "primary"
          ? "#e5e3ff"
          : "#eef0fa"};
  border-left: 4px solid
    ${({ theme, $accent }) =>
      $accent === "warn"
        ? "#e74c3c"
        : $accent === "primary"
          ? theme.colors.primary["00"]
          : "#cdd5f4"};
  border-radius: 12px;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ResultHeading = styled.h3`
  ${({ theme }) => theme.typography.body.L2};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ResultBody = styled.div`
  ${({ theme }) => theme.typography.body.M0};
  color: ${({ theme }) => theme.colors.grayScale["01"]};
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const QuestionLine = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const DifficultyBadge = styled.span<{ $level: string }>`
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 999px;
  ${({ theme }) => theme.typography.body.S0};
  font-weight: 700;
  background: ${({ $level }) =>
    $level === "압박"
      ? "#ffe9e9"
      : $level === "심화"
        ? "#fff5d9"
        : "#e8f0ff"};
  color: ${({ $level }) =>
    $level === "압박"
      ? "#c0392b"
      : $level === "심화"
        ? "#a36a00"
        : "#2f4ec7"};
`;

export const QuestionText = styled.p`
  ${({ theme }) => theme.typography.body.L2};
  font-size: 17px;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  margin: 0;
  line-height: 1.5;
`;

export const ModelAnswerBody = styled.div`
  ${({ theme }) => theme.typography.body.M0};
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  line-height: 1.85;
  white-space: pre-wrap;
  font-size: 16px;
`;

export const ErrorBanner = styled.div`
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #fff5f5;
  border: 1px solid #ffe0e0;
  color: #c0392b;
  ${({ theme }) => theme.typography.body.S0};
  animation: ${fadeUp} 0.25s ease-out;
`;

export const Hint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.grayScale["04"]};
  ${({ theme }) => theme.typography.body.S0};
`;
