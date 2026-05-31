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
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemCard = styled.div`
  background: #fff;
  border: 1px solid #eef0fa;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.15s ease;

  &:hover {
    box-shadow: 0 4px 14px rgba(60, 50, 200, 0.08);
  }
`;

export const ItemHeader = styled.button`
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 16px 20px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
`;

export const ItemMeta = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
`;

export const DifficultyBadge = styled.span<{ $level: string }>`
  padding: 3px 10px;
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

export const OptionTag = styled.span`
  padding: 2px 8px;
  border-radius: 6px;
  background: #f5f6ff;
  color: ${({ theme }) => theme.colors.grayScale["03"]};
  ${({ theme }) => theme.typography.body.S0};
  font-size: 12px;
`;

export const ItemBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const QuestionText = styled.p`
  ${({ theme }) => theme.typography.body.L2};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  margin: 0;
  line-height: 1.45;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Snippet = styled.p`
  ${({ theme }) => theme.typography.body.M0};
  color: ${({ theme }) => theme.colors.grayScale["03"]};
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
`;

export const Timestamp = styled.span`
  ${({ theme }) => theme.typography.body.S0};
  color: ${({ theme }) => theme.colors.grayScale["04"]};
  font-size: 12px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.grayScale["04"]};
  ${({ theme }) => theme.typography.body.S0};
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;

  &:hover {
    background: #fff5f5;
    color: #c0392b;
  }
`;

// ── 확장된 디테일 패널 ───────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const DetailPanel = styled.div`
  border-top: 1px solid #eef0fa;
  padding: 16px 20px 20px;
  background: #fafbff;
  animation: ${fadeIn} 0.2s ease-out;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const DetailLabel = styled.h4`
  margin: 0;
  ${({ theme }) => theme.typography.body.L2};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary["00"]};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const DetailBody = styled.div`
  ${({ theme }) => theme.typography.body.M0};
  color: ${({ theme }) => theme.colors.grayScale["01"]};
  line-height: 1.7;
  white-space: pre-wrap;
  font-size: 14.5px;
`;

export const ModelAnswerBlock = styled(DetailBody)`
  font-size: 15.5px;
  color: ${({ theme }) => theme.colors.grayScale["00"]};
  background: #fff;
  border-left: 3px solid ${({ theme }) => theme.colors.primary["00"]};
  padding: 12px 14px;
  border-radius: 8px;
`;

export const RiskBlock = styled(DetailBody)`
  background: #fff5f5;
  border-left: 3px solid #e74c3c;
  color: #c0392b;
  padding: 10px 14px;
  border-radius: 8px;
`;

// ── 빈 상태 / 에러 ───────────────────────────────────────────────────────

export const EmptyState = styled.div`
  background: #fff;
  border: 1px dashed ${({ theme }) => theme.colors.grayScale["08"]};
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.grayScale["03"]};
  ${({ theme }) => theme.typography.body.M0};
`;

export const ErrorBanner = styled.div`
  padding: 14px 16px;
  border-radius: 12px;
  background: #fff5f5;
  border: 1px solid #ffe0e0;
  color: #c0392b;
  ${({ theme }) => theme.typography.body.S0};
`;

export const LinkButton = styled.button`
  margin-top: 14px;
  background: ${({ theme }) => theme.colors.primary["00"]};
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  ${({ theme }) => theme.typography.body.M0};
  font-weight: 600;
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
`;
