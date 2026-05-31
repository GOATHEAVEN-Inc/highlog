import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import * as S from "@/pages/recordManagement/detail/questionsList/questionsList.styles";
import QuestionCard, { type QuestionCardProps } from "@/components/card/QuestionCard";
import { useRecordDetail } from "@/api/record/useRecordDetailApi";
import { useQuestionList } from "@/api/question/useQuestionListApi";
import type { Question } from "@/api/question/questionTypes";

/** 화면 탭 라벨 ↔ 백엔드 카테고리 매핑 (DB: 성적/세특/창체/행특/기타) */
const TAB_CONFIG = [
  { label: "교과 성적", category: "성적" },
  { label: "세부능력 및 특기사항", category: "세특" },
  { label: "창의적 체험활동", category: "창체" },
  { label: "행동특성 및 종합의견", category: "행특" },
  { label: "기타", category: "기타" },
] as const;

const DIFFICULTY_TO_LABEL: Record<string, QuestionCardProps["labelType"]> = {
  기본: "basic",
  심화: "intermediate",
  압박: "advanced",
};

function toCardProps(q: Question): QuestionCardProps {
  return {
    labelType: DIFFICULTY_TO_LABEL[q.difficulty] ?? "basic",
    text: q.content,
    questionPurposeText: q.purpose,
    answerPointText: q.answerPoints,
    answerText: q.modelAnswer,
    answerCriteriaText: q.evaluationCriteria,
    favoriteType: q.isBookmarked ? "select" : "default",
  };
}

export default function QuestionsList() {
  const { id } = useParams<{ id: string }>();
  const recordId = Number(id);
  const [activeTab, setActiveTab] = useState<(typeof TAB_CONFIG)[number]>(
    TAB_CONFIG[0],
  );

  const { data: record, isLoading: isRecordLoading } = useRecordDetail(recordId);
  const setId = record?.questionSets?.[0]?.id;
  const setTitle = record?.questionSets?.[0]?.title;

  const { data: questions, isLoading: isQuestionsLoading } = useQuestionList(
    setId,
    activeTab.category,
  );

  const cards = useMemo(
    () => (questions ?? []).map(toCardProps),
    [questions],
  );

  if (!isRecordLoading && record && !setId) {
    return (
      <S.questionsListContainer>
        <S.questionsListWrapper>
          <S.TextBox>
            <S.Title>{record.title}</S.Title>
          </S.TextBox>
          <S.EmptyState>
            아직 생성된 질문이 없습니다. 질문을 먼저 생성해 주세요.
          </S.EmptyState>
        </S.questionsListWrapper>
      </S.questionsListContainer>
    );
  }

  return (
    <S.questionsListContainer>
      <S.questionsListWrapper>
        <S.TextBox>
          <S.Title>{record?.title ?? "생성된 질문"}</S.Title>
          {setTitle && (
            <S.DescriptionBox>
              <S.NameBox>
                <S.Subject>질문 세트</S.Subject>
                <S.Name>{setTitle}</S.Name>
              </S.NameBox>
            </S.DescriptionBox>
          )}
        </S.TextBox>
        <S.TabContainer>
          {TAB_CONFIG.map((tab) => (
            <S.TabItem
              key={tab.category}
              $isActive={activeTab.category === tab.category}
              onClick={() => setActiveTab(tab)}
            >
              {tab.label}
            </S.TabItem>
          ))}
        </S.TabContainer>
        <S.QuestionList>
          {isQuestionsLoading || isRecordLoading ? (
            <S.EmptyState>질문을 불러오는 중입니다…</S.EmptyState>
          ) : cards.length > 0 ? (
            cards.map((props, i) => (
              <S.QuestionCardWrapper key={questions?.[i]?.questionId ?? i}>
                <QuestionCard {...props} onFavoriteClick={() => {}} />
              </S.QuestionCardWrapper>
            ))
          ) : (
            <S.EmptyState>해당 영역에 대한 질문이 없습니다.</S.EmptyState>
          )}
        </S.QuestionList>
      </S.questionsListWrapper>
    </S.questionsListContainer>
  );
}
