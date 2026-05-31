import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "@/features/home/InstantAnswerSection.styles";
import Wand from "@/assets/icons/wand.svg?react";
import ArrowRight from "@/assets/icons/arrow_right.svg?react";

// 홈 최상단의 1-line 면접 질문 입력 바.
// 결과는 여기서 렌더하지 않고, 입력 즉시 /qna 페이지로 question을 넘겨 자동 생성하게 한다.

// 빈 화면을 채우기 위한 클릭형 추천 질문. 자주 나오는 면접 패턴 위주.
const SAMPLE_QUESTIONS = [
  "동아리 활동에서 가장 큰 갈등은 무엇이었고, 어떻게 해결했나요?",
  "왜 이 학과에 지원하게 됐나요?",
  "본인의 가장 큰 강점과 약점은 무엇이라고 생각하나요?",
  "고등학교 생활에서 가장 의미 있었던 경험은 무엇인가요?",
  "최근 1년 동안 가장 깊이 있게 탐구한 주제를 설명해 주세요.",
];

// /qna 페이지가 이 키로 location.state에서 질문을 읽어 자동 제출한다.
export interface QnaNavState {
  question: string;
}

export default function InstantAnswerSection() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");

  const goToQna = (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 2) return;
    navigate("/qna", { state: { question: trimmed } satisfies QnaNavState });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    goToQna(question);
  };

  const isDisabled = question.trim().length < 2;

  return (
    <S.Section>
      <S.Form onSubmit={handleSubmit}>
        <S.InputWrapper>
          <S.InputIcon>
            <Wand width={18} height={18} />
          </S.InputIcon>
          <S.Input
            id="home-qna-question"
            type="text"
            placeholder="면접 질문을 입력하면 AI가 즉시 모범답안을 만들어드려요"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={1000}
            aria-label="면접 질문 입력"
          />
        </S.InputWrapper>
        <S.SubmitButton type="submit" disabled={isDisabled}>
          모범답안 받기
          <ArrowRight width={16} height={16} />
        </S.SubmitButton>
      </S.Form>

      <S.ChipRow>
        <S.ChipLabel>예시:</S.ChipLabel>
        {SAMPLE_QUESTIONS.map((q) => (
          <S.Chip key={q} type="button" onClick={() => goToQna(q)}>
            {q.length > 24 ? `${q.slice(0, 24)}…` : q}
          </S.Chip>
        ))}
      </S.ChipRow>
    </S.Section>
  );
}
