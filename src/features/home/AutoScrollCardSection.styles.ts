import styled, {keyframes} from "styled-components";
import CARD_IMG from "@/assets/images/card_img.png"

const rolling = keyframes`
    0% { transform: translateX(0);}
    100% { transform: translateX(-50%);}
`;

export const AutoScrollCardSectionConatiner = styled.section`
    display: flex;
    width: 100%;
    padding: 62px 0 159px 0;
    justify-content: center;
    align-items: center;

    @media (max-width: 1024px) {
        padding: 40px 0 56px;
    }
`;

export const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 48px;

    @media (max-width: 1024px) {
        gap: 24px;
    }
`;

export const MainTitle = styled.p`
    ${({theme}) => theme.typography.head.H2};
    color: ${({theme}) => theme.colors.grayScale["00"]};
    text-align: center;

    @media (max-width: 1024px) {
        font-size: 20px;
        padding: 0 24px;
        line-height: 1.4;
    }
`;

export const ScrollContainer = styled.div`
    width: 100%;       
    overflow: hidden;  
`;

export const AnimationCard = styled.div`
    display: flex;
    width: max-content; 
    align-items: center;
    gap: 20px;
    animation: ${rolling} 20000ms linear infinite;

    &:hover {
        animation-play-state: paused;
    }
`;

export const CardImg = styled.div`
    width: 384px;
    height: 238px;
    border-radius: 16px;
    background: url(${CARD_IMG});
    position: relative;
    flex-shrink: 0;

    @media (max-width: 640px) {
        width: 280px;
        height: 174px;
    }
`;

export const CardNoneImg = styled.div`
    width: 384px;
    height: 238px;
    border-radius: 16px;
    background-color: #f0f2f7;
    box-shadow: 0 3px 2px 0 rgba(27, 28, 54, 0.25);
    position: relative;
    flex-shrink: 0;

    @media (max-width: 640px) {
        width: 280px;
        height: 174px;
    }
`;

export const CardTextImg = styled.p`
    ${({theme}) => theme.typography.body.S2};
    color: ${({theme}) => theme.colors.grayScale["10"]};
    white-space: pre-line;
    position: absolute;
    top: 36px;
    left: 36px;
`;

export const CardFromTextImg = styled.p`
    ${({theme}) => theme.typography.body.S2};
    color: ${({theme}) => theme.colors.grayScale["10"]};
    position: absolute;
    bottom: 26px;
    right: 23px;
`;

export const CardTextNoneImg = styled.p`
    ${({theme}) => theme.typography.body.S2};
    color: ${({theme}) => theme.colors.grayScale["00"]};
    white-space: pre-line;
    position: absolute;
    top: 36px;
    left: 36px;
`;

export const CardFromTextNoneImg = styled.p`
    ${({theme}) => theme.typography.body.S2};
    color: ${({theme}) => theme.colors.grayScale["04"]};
    position: absolute;
    bottom: 26px;
    right: 23px;
`;
