import ArrowRight from "@/assets/icons/arrow_right.svg?react";
import * as S from "@/components/card/RecordCard.styles";

interface RecordCardProps {
  text: string;
  onClick?: () => void;
}

export default function RecordCard({ text, onClick }: RecordCardProps) {
  return (
    <S.RecordCardContainer>
      <S.RecordCardText>{text}</S.RecordCardText>
      <S.RecordCardIconWrapper onClick={onClick}>
        <S.RecordCardIcon as={ArrowRight} />
      </S.RecordCardIconWrapper>
    </S.RecordCardContainer>
  );
}
