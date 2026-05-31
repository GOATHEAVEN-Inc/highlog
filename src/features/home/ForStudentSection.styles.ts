import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(75px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ForStudentSectionContainer =styled.section`
    width: 100%;
    height: 845px;
    background: linear-gradient(180deg, #D9DEFF 0%, #AFB8F2 100%);
    display: flex;
    justify-content: center;
    padding-top : 120px;
    overflow: hidden;

    @media (max-width: 1024px) {
        height: auto;
        padding: 48px 20px;
    }
`;

export const TextImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 42px;

    @media (max-width: 1024px) {
        gap: 24px;
        width: 100%;
    }
`;

export const TextBox = styled.div`
    padding-left: 32px;

    @media (max-width: 1024px) {
        padding-left: 0;
        text-align: center;
    }
`;

export const TextSub = styled.p`
    ${({theme}) => theme.typography.body.XL};
    color: ${({theme}) => theme.colors.primary["00"]};
`;

export const TextMain = styled.p`
    ${({theme}) => theme.typography.head.H2};
    color: #000;
    white-space: pre-wrap;

    @media (max-width: 1024px) {
        font-size: 20px;
        line-height: 1.4;
    }
`;

export const ImgButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 1134px;
    height: 775px;

    @media (max-width: 1024px) {
        width: 100%;
        height: auto;
    }
`;

export const ButtonBox = styled.div`
    display: flex;
    padding-left: 40px;

    @media (max-width: 1024px) {
        padding-left: 0;
    }
`;

export const ClickButton = styled.button<{$active: boolean}>`
    display: flex;
    height: 49px;
    padding: 8px 44px;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 12px 12px 0 0;
    border-top: ${({$active}) => $active ? "1px solid #FAF9FF" : "none"};
    border-right: ${({$active}) => $active ? "1px solid #FAF9FF" :"0.5px solid #A3A4F1"};
    background: ${({$active}) => $active ? "#EFF3FF" : "#C3C9DB"};
    cursor: pointer;

    ${({theme}) => theme.typography.body.L2};
    color: ${({$active}) => $active ? "#1B1EC8" : "#8B8CA5"};

    @media (max-width: 1024px) {
        flex: 1;
        height: 40px;
        padding: 6px 12px;
        font-size: 13px;
    }
`;

export const SampleImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const SampleImage = styled.img<{$active: boolean}>`
    width: 100%;
    height: 100%;
    display: ${({$active}) => $active ? "block" : "none"};
`;

export const DescriptionBox = styled.div`
    position: absolute;
    top: 220px;
    right: -32px;
    gap: 8px;
    padding: 12px 32px;
    border-radius: 16px 16px 0 16px;
    border: 0.5px solid ${({theme}) => theme.colors.secondary["06"]};
    background-color: ${({theme}) => theme.colors.primary["00"]};
    box-shadow: 2px 3px 2px 0 rgba(7, 2, 30, 0.25);
    animation: ${slideUp} 0.5s ease-out forwards;

    @media (max-width: 1024px) {
        /* 모바일에선 image overlay 코멘트 박스 숨김 — 좁아서 가독성 떨어짐 */
        display: none;
    }
`;

export const DescriptionText = styled.p`
    ${({theme}) => theme.typography.body.L2};
    color: ${({theme}) => theme.colors.grayScale["10"]};
`;