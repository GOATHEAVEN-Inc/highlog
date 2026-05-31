import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import Title from "@/components/title/Title";
import { requestInstantAnswer } from "@/api/qna";
import type {
  InstantAnswerResponse,
  QnaLength,
  QnaTone,
} from "@/api/qna";
import { QNA_LENGTH_OPTIONS, QNA_TONE_OPTIONS } from "@/api/qna";
import * as S from "@/pages/qna/Qna.styles";
import Wand from "@/assets/icons/wand.svg?react";
import ArrowRight from "@/assets/icons/arrow_right.svg?react";
import LoaderCircle from "@/assets/icons/loader_circle.svg?react";

interface QnaLocationState {
  question?: string;
}

// useAnswerState: useMutation 대신 직접 fetch + sequence ref — StrictMode/HMR 친화적.
function useAnswerState() {
  const [data, setData] = useState<InstantAnswerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const requestSeqRef = useRef(0);

  const submit = (input: {
    question: string;
    target_school?: string;
    target_major?: string;
    length?: QnaLength;
    tone?: QnaTone;
  }) => {
    const mySeq = ++requestSeqRef.current;
    setIsPending(true);
    setError(null);
    requestInstantAnswer(input)
      .then((res) => {
        if (mySeq !== requestSeqRef.current) return;
        setData(res);
        setIsPending(false);
      })
      .catch((e: Error) => {
        if (mySeq !== requestSeqRef.current) return;
        setError(e.message || "답안 생성에 실패했습니다.");
        setIsPending(false);
      });
  };

  return { data, error, isPending, submit };
}

export default function QnaPage() {
  const location = useLocation();
  const navState = (location.state ?? null) as QnaLocationState | null;

  const [question, setQuestion] = useState(navState?.question ?? "");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [length, setLength] = useState<QnaLength>("60초");
  const [tone, setTone] = useState<QnaTone>("차분한");

  const answer = useAnswerState();

  // 홈에서 넘어온 자동 제출 — 컴포넌트 인스턴스당 1회 제한.
  const autoSubmittedRef = useRef(false);
  useEffect(() => {
    const incoming = navState?.question?.trim();
    if (!incoming || autoSubmittedRef.current) return;
    autoSubmittedRef.current = true;
    setQuestion(incoming);
    answer.submit({ question: incoming, length: "60초", tone: "차분한" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navState?.question]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (trimmed.length < 2) return;
    answer.submit({
      question: trimmed,
      target_school: school.trim() || undefined,
      target_major: major.trim() || undefined,
      length,
      tone,
    });
  };

  const isDisabled = question.trim().length < 2 || answer.isPending;

  return (
    <S.Container>
      <S.HeaderSection>
        <S.Eyebrow>AI 면접 컨설턴트</S.Eyebrow>
        <Title text="질문 분석" />
        <S.Description>
          궁금한 면접 질문을 입력하면, 학생부 기반 모범답안·꼬리질문·답변 팁까지
          한 번에 받아볼 수 있어요.
        </S.Description>
      </S.HeaderSection>

      <form onSubmit={handleSubmit}>
        <S.FormCard>
          <S.FieldGroup>
            <S.FieldLabel htmlFor="qna-question">면접 질문</S.FieldLabel>
            <S.TextAreaWrapper>
              <S.TextAreaIcon>
                <Wand width={18} height={18} />
              </S.TextAreaIcon>
              <S.TextArea
                id="qna-question"
                placeholder="예) 동아리 활동에서 가장 큰 갈등은 무엇이었고, 어떻게 해결했나요?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={1000}
              />
            </S.TextAreaWrapper>
            <S.Hint>2자 이상, 1000자 이하로 입력해 주세요.</S.Hint>
          </S.FieldGroup>

          <S.OptionalRow>
            <S.FieldGroup>
              <S.FieldLabel htmlFor="qna-school">지원 대학 (선택)</S.FieldLabel>
              <S.Input
                id="qna-school"
                placeholder="예) 서울대학교"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                maxLength={100}
              />
            </S.FieldGroup>
            <S.FieldGroup>
              <S.FieldLabel htmlFor="qna-major">지원 학과 (선택)</S.FieldLabel>
              <S.Input
                id="qna-major"
                placeholder="예) 컴퓨터공학과"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                maxLength={100}
              />
            </S.FieldGroup>
          </S.OptionalRow>

          <S.FieldGroup>
            <S.FieldLabel>답변 길이</S.FieldLabel>
            <S.ChipGroup>
              {QNA_LENGTH_OPTIONS.map((opt) => (
                <S.ChipButton
                  key={opt}
                  type="button"
                  $active={length === opt}
                  onClick={() => setLength(opt)}
                >
                  {opt}
                </S.ChipButton>
              ))}
            </S.ChipGroup>
          </S.FieldGroup>

          <S.FieldGroup>
            <S.FieldLabel>말투</S.FieldLabel>
            <S.ChipGroup>
              {QNA_TONE_OPTIONS.map((opt) => (
                <S.ChipButton
                  key={opt}
                  type="button"
                  $active={tone === opt}
                  onClick={() => setTone(opt)}
                >
                  {opt}
                </S.ChipButton>
              ))}
            </S.ChipGroup>
          </S.FieldGroup>

          <S.SubmitButton type="submit" disabled={isDisabled}>
            {answer.isPending ? (
              <>
                <S.Spinner>
                  <LoaderCircle width={18} height={18} />
                </S.Spinner>
                답안 생성 중
              </>
            ) : (
              <>
                모범답안 받기
                <ArrowRight width={16} height={16} />
              </>
            )}
          </S.SubmitButton>
        </S.FormCard>
      </form>

      {answer.error && <S.ErrorBanner>{answer.error}</S.ErrorBanner>}

      {answer.data && <AnswerResult data={answer.data} />}
    </S.Container>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// 결과 렌더링 — 5-step 컨설팅 결과를 섹션별로 노출
// ─────────────────────────────────────────────────────────────────────────

interface AnswerResultProps {
  data: InstantAnswerResponse;
}

function AnswerResult({ data }: AnswerResultProps) {
  return (
    <S.ResultWrapper>
      {/* 헤더: 질문 + 난이도 */}
      <S.ResultCard $accent="primary">
        <S.QuestionLine>
          <S.DifficultyBadge $level={data.difficulty}>
            {data.difficulty}
          </S.DifficultyBadge>
          <S.QuestionText>{data.question}</S.QuestionText>
        </S.QuestionLine>
      </S.ResultCard>

      {/* Step 1: 질문 의도 */}
      {data.question_intent && (
        <S.ResultCard>
          <S.ResultHeading>🎯 질문 의도</S.ResultHeading>
          <S.ResultBody>{data.question_intent}</S.ResultBody>
        </S.ResultCard>
      )}

      {/* Step 2: 생기부 활용 근거 */}
      {data.record_basis && (
        <S.ResultCard>
          <S.ResultHeading>📂 생기부 활용 근거</S.ResultHeading>
          <S.ResultBody>{data.record_basis}</S.ResultBody>
        </S.ResultCard>
      )}

      {/* Step 3: 답변 전략 */}
      <S.ResultCard>
        <S.ResultHeading>🧭 답변 전략</S.ResultHeading>
        <S.ResultBody>
          <strong>핵심:</strong> {data.purpose}
          {data.answer_points && (
            <>
              {"\n"}
              <strong>포인트:</strong> {data.answer_points}
            </>
          )}
        </S.ResultBody>
      </S.ResultCard>

      {/* Step 4: 최종 답변 — 메인 콘텐츠 */}
      <S.ResultCard $accent="primary">
        <S.ResultHeading>💬 최종 답변</S.ResultHeading>
        <S.ModelAnswerBody>{data.model_answer}</S.ModelAnswerBody>
      </S.ResultCard>

      {/* Step 5: 평가 포인트 */}
      {data.evaluation_criteria && (
        <S.ResultCard>
          <S.ResultHeading>📝 면접관 평가 포인트</S.ResultHeading>
          <S.ResultBody>{data.evaluation_criteria}</S.ResultBody>
        </S.ResultCard>
      )}

      {/* Step 5: 꼬리질문 */}
      {data.follow_up_questions && (
        <S.ResultCard>
          <S.ResultHeading>🔁 예상 꼬리질문</S.ResultHeading>
          <S.ResultBody>{data.follow_up_questions}</S.ResultBody>
        </S.ResultCard>
      )}

      {/* Step 5: 답변 팁 */}
      {data.improvement_tips && (
        <S.ResultCard>
          <S.ResultHeading>💡 답변 팁</S.ResultHeading>
          <S.ResultBody>{data.improvement_tips}</S.ResultBody>
        </S.ResultCard>
      )}

      {/* 안전장치: 위험 / 근거 부족 */}
      {data.risk_notes && (
        <S.ResultCard $accent="warn">
          <S.ResultHeading>⚠️ 주의·보완 필요</S.ResultHeading>
          <S.ResultBody>{data.risk_notes}</S.ResultBody>
        </S.ResultCard>
      )}
    </S.ResultWrapper>
  );
}
