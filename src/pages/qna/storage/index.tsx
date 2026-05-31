import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Title from "@/components/title/Title";
import { useAuth } from "@/contexts/AuthContext";
import {
  fetchQnaHistory,
  fetchQnaHistoryDetail,
  deleteQnaHistory,
} from "@/api/qna";
import type { QnaHistoryDetail, QnaHistoryItem } from "@/api/qna";
import * as S from "@/pages/qna/storage/Storage.styles";

// 분석 기록 페이지: 로그인 사용자의 /qna 호출 결과가 자동으로 쌓인다.
// 목록 한 줄을 클릭하면 상세를 불러와 인라인으로 펼친다.

function formatTime(iso: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
  } catch {
    return iso;
  }
}

export default function QnaStoragePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [items, setItems] = useState<QnaHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 펼친 항목의 상세를 캐시. id → detail.
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detailCache, setDetailCache] = useState<Record<number, QnaHistoryDetail>>(
    {},
  );
  const [detailLoadingId, setDetailLoadingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchQnaHistory();
      setItems(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "기록을 불러오지 못했습니다.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    load();
  }, [isAuthenticated, load]);

  const toggleExpand = async (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);
    if (!detailCache[id]) {
      setDetailLoadingId(id);
      try {
        const d = await fetchQnaHistoryDetail(id);
        setDetailCache((prev) => ({ ...prev, [id]: d }));
      } catch (e) {
        const msg = e instanceof Error ? e.message : "상세를 불러오지 못했습니다.";
        setError(msg);
      } finally {
        setDetailLoadingId(null);
      }
    }
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("이 분석 기록을 삭제할까요?")) return;
    try {
      await deleteQnaHistory(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
      if (expandedId === id) setExpandedId(null);
      setDetailCache((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "삭제에 실패했습니다.";
      setError(msg);
    }
  };

  // 비로그인 사용자 안내
  if (!isAuthenticated) {
    return (
      <S.Container>
        <S.HeaderSection>
          <S.Eyebrow>분석 기록</S.Eyebrow>
          <Title text="질문 분석 기록" />
          <S.Description>
            로그인한 사용자의 질문 분석 결과가 이곳에 자동으로 저장됩니다.
          </S.Description>
        </S.HeaderSection>
        <S.EmptyState>
          기록을 보려면 먼저 로그인해주세요.
          <br />
          <S.LinkButton onClick={() => navigate("/auth")}>로그인 하러 가기</S.LinkButton>
        </S.EmptyState>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.HeaderSection>
        <S.Eyebrow>분석 기록</S.Eyebrow>
        <Title text="질문 분석 기록" />
        <S.Description>
          {isLoading
            ? "기록을 불러오는 중..."
            : items.length === 0
              ? "아직 저장된 분석 기록이 없어요."
              : `총 ${items.length}건 · 최근 분석순`}
        </S.Description>
      </S.HeaderSection>

      {error && <S.ErrorBanner>{error}</S.ErrorBanner>}

      {!isLoading && items.length === 0 && !error && (
        <S.EmptyState>
          질문 분석 페이지에서 모범답안을 받으면 여기에 자동으로 쌓입니다.
          <br />
          <S.LinkButton onClick={() => navigate("/qna")}>질문 분석 하러 가기</S.LinkButton>
        </S.EmptyState>
      )}

      <S.List>
        {items.map((item) => {
          const expanded = expandedId === item.id;
          const detail = detailCache[item.id];
          return (
            <S.ItemCard key={item.id}>
              <S.ItemHeader onClick={() => toggleExpand(item.id)}>
                <S.ItemMeta>
                  <S.DifficultyBadge $level={item.difficulty}>
                    {item.difficulty}
                  </S.DifficultyBadge>
                  {item.length && <S.OptionTag>{item.length}</S.OptionTag>}
                  {item.tone && <S.OptionTag>{item.tone}</S.OptionTag>}
                </S.ItemMeta>
                <S.ItemBody>
                  <S.QuestionText>{item.question}</S.QuestionText>
                  <S.Snippet>{item.model_answer}</S.Snippet>
                  <S.ItemFooter>
                    <S.Timestamp>{formatTime(item.created_at)}</S.Timestamp>
                    <S.DeleteButton onClick={(e) => handleDelete(item.id, e)}>
                      삭제
                    </S.DeleteButton>
                  </S.ItemFooter>
                </S.ItemBody>
              </S.ItemHeader>

              {expanded && (
                <S.DetailPanel>
                  {detailLoadingId === item.id && !detail && (
                    <S.DetailBody>상세 내용을 불러오는 중...</S.DetailBody>
                  )}
                  {detail && <DetailContent detail={detail} />}
                </S.DetailPanel>
              )}
            </S.ItemCard>
          );
        })}
      </S.List>
    </S.Container>
  );
}

function DetailContent({ detail }: { detail: QnaHistoryDetail }) {
  return (
    <>
      {detail.question_intent && (
        <S.DetailSection>
          <S.DetailLabel>🎯 질문 의도</S.DetailLabel>
          <S.DetailBody>{detail.question_intent}</S.DetailBody>
        </S.DetailSection>
      )}

      {detail.record_basis && (
        <S.DetailSection>
          <S.DetailLabel>📂 생기부 활용 근거</S.DetailLabel>
          <S.DetailBody>{detail.record_basis}</S.DetailBody>
        </S.DetailSection>
      )}

      {(detail.purpose || detail.answer_points) && (
        <S.DetailSection>
          <S.DetailLabel>🧭 답변 전략</S.DetailLabel>
          <S.DetailBody>
            {detail.purpose && (
              <>
                <strong>핵심:</strong> {detail.purpose}
                {"\n"}
              </>
            )}
            {detail.answer_points && (
              <>
                <strong>포인트:</strong> {detail.answer_points}
              </>
            )}
          </S.DetailBody>
        </S.DetailSection>
      )}

      <S.DetailSection>
        <S.DetailLabel>💬 최종 답변</S.DetailLabel>
        <S.ModelAnswerBlock>{detail.model_answer}</S.ModelAnswerBlock>
      </S.DetailSection>

      {detail.evaluation_criteria && (
        <S.DetailSection>
          <S.DetailLabel>📝 면접관 평가 포인트</S.DetailLabel>
          <S.DetailBody>{detail.evaluation_criteria}</S.DetailBody>
        </S.DetailSection>
      )}

      {detail.follow_up_questions && (
        <S.DetailSection>
          <S.DetailLabel>🔁 예상 꼬리질문</S.DetailLabel>
          <S.DetailBody>{detail.follow_up_questions}</S.DetailBody>
        </S.DetailSection>
      )}

      {detail.improvement_tips && (
        <S.DetailSection>
          <S.DetailLabel>💡 답변 팁</S.DetailLabel>
          <S.DetailBody>{detail.improvement_tips}</S.DetailBody>
        </S.DetailSection>
      )}

      {detail.risk_notes && (
        <S.DetailSection>
          <S.DetailLabel>⚠️ 주의·보완</S.DetailLabel>
          <S.RiskBlock>{detail.risk_notes}</S.RiskBlock>
        </S.DetailSection>
      )}
    </>
  );
}
