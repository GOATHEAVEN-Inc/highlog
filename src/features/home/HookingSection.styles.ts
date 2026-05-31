import styled from "styled-components";
import Hooking_img from "@/assets/images/hooking.png";
import { Link } from "react-router-dom";

// 768px 이하 = 모바일. 그 이상은 기존 데스크탑 디자인 유지.

export const HookingSectionContainer = styled.section`
  width: 100%;
  display: flex;
  gap: max(27px, 1.875vw);
  align-items: center;
  height: max(560px, 38.9vw);

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    padding: 24px 20px;
    gap: 20px;
  }
`;

export const HookingTextWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  border-radius: 0 max(20px, 1.39vw) max(20px, 1.39vw) 0;
  width: max(987px, 68.54vw);
  height: max(457px, 31.74vw);
  background-image: url(${Hooking_img});
  background-size: cover;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 100%;
    height: 280px;
    border-radius: 16px;

    /* 모바일에선 이미지 위에 어두운 오버레이를 깔아 텍스트 가독성 확보 */
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(40, 38, 110, 0.55) 0%,
        rgba(40, 38, 110, 0.35) 100%
      );
      z-index: 0;
    }
  }

  @media (max-width: 480px) {
    height: 230px;
  }
`;

export const HookingTextBox = styled.div`
  position: absolute;
  display: flex;
  width: max(513px, 35.625vw);
  flex-direction: column;
  align-items: flex-start;
  gap: max(4px, 0.28vw);
  top: max(58px, 4.03vw);
  left: max(120px, 8.33vw);

  @media (max-width: 1024px) {
    width: calc(100% - 40px);
    top: 28px;
    left: 24px;
    z-index: 1;
  }
`;

export const HookingTextMain = styled.p`
  ${({ theme }) => theme.typography.head.H2};
  font-size: max(32px, 2.22vw);
  line-height: max(48px, 3.33vw);
  color: ${({ theme }) => theme.colors.secondary["09"]};
  white-space: pre-wrap;

  @media (max-width: 1024px) {
    font-size: 22px;
    line-height: 30px;
    color: #fff;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 480px) {
    font-size: 18px;
    line-height: 26px;
  }
`;

export const HookingTextSubBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HookingTextSub = styled.p`
  ${({ theme }) => theme.typography.body.L0};
  font-size: max(20px, 1.39vw);
  line-height: max(30px, 2.08vw);
  color: ${({ theme }) => theme.colors.secondary["07"]};
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 13px;
    line-height: 18px;
    white-space: normal;
    color: rgba(255, 255, 255, 0.92);
  }
`;

export const HookingTextSubBold = styled.span`
  ${({ theme }) => theme.typography.body.L1};
  font-size: max(20px, 1.39vw);
  line-height: max(30px, 2.08vw);
  color: ${({ theme }) => theme.colors.secondary["08"]};

  @media (max-width: 1024px) {
    font-size: 13px;
    line-height: 18px;
    color: #fff;
    font-weight: 700;
  }
`;

export const HookingCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: max(39px, 2.71vw);

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    padding: 0 4px;
  }
`;

export const HookingCardStatBox = styled.div`
  display: flex;
  width: max(306px, 21.25vw);
  flex-direction: column;
  align-items: flex-start;
  gap: max(8px, 0.56vw);
  border-radius: max(16px, 1.11vw);

  @media (max-width: 1024px) {
    /* 모바일에서는 3개 stat이 가로로 3열 */
    width: calc((100% - 24px) / 3);
    gap: 0;
  }
`;

export const HookingCardStat = styled.div`
  height: max(99px, 6.875vw);
  align-self: stretch;
  border-radius: max(16px, 1.11vw);
  background: linear-gradient(169deg, #cdd5f4 17.2%, #fafafa 93.94%);
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    height: 72px;
    border-radius: 12px;
  }
`;

export const HookingCardStatTextBox = styled.div`
  position: absolute;
  left: max(24px, 1.67vw);
  top: max(21.5px, 1.49vw);
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    left: 12px;
    top: 12px;
  }
`;

export const HookingCardStatTextMain = styled.p`
  ${({ theme }) => theme.typography.body.XS2};
  font-size: max(14px, 0.97vw);
  line-height: max(21px, 1.46vw);
  color: ${({ theme }) => theme.colors.secondary["00"]};

  @media (max-width: 1024px) {
    font-size: 11px;
    line-height: 14px;
  }
`;

export const HookingCardStatTextSub = styled.p`
  ${({ theme }) => theme.typography.head.H4};
  font-size: max(24px, 1.67vw);
  line-height: max(36px, 2.5vw);
  color: ${({ theme }) => theme.colors.grayScale["00"]};

  @media (max-width: 1024px) {
    font-size: 15px;
    line-height: 20px;
  }
`;

export const HookingCardStatImg = styled.img`
  width: max(127px, 8.82vw);
  height: max(127px, 8.82vw);
  position: absolute;
  left: max(154px, 10.69vw);
  top: calc(max(30px, 2.08vw) * -1);

  @media (max-width: 1024px) {
    /* 모바일 카드가 작아 stat 일러스트는 숨김 */
    display: none;
  }
`;

export const HookingEventCard = styled(Link)`
  display: flex;
  width: max(306px, 21.25vw);
  height: max(105px, 7.29vw);
  border-radius: max(12px, 0.83vw);
  background-color: ${({ theme }) => theme.colors.primary["00"]};
  padding-left: max(19px, 1.32vw);
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 1024px) {
    width: 100%;
    height: 70px;
    border-radius: 12px;
    padding-left: 16px;
  }
`;

export const HookingEventText = styled.p`
  ${({ theme }) => theme.typography.body.M2};
  font-size: max(18px, 1.25vw);
  line-height: max(27px, 1.875vw);
  color: ${({ theme }) => theme.colors.grayScale["11"]};

  @media (max-width: 1024px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const HookingEventTextSub = styled.span`
  ${({ theme }) => theme.typography.body.M1};
  font-size: max(18px, 1.25vw);
  line-height: max(27px, 1.875vw);
  color: ${({ theme }) => theme.colors.grayScale["11"]};
  white-space: pre-wrap;

  @media (max-width: 1024px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const HookingEventImg = styled.img`
  width: max(125px, 8.68vw);
  height: max(90px, 6.25vw);
  margin-top: max(15px, 1.04vw);

  @media (max-width: 1024px) {
    width: 80px;
    height: 58px;
    margin-top: 8px;
  }
`;
