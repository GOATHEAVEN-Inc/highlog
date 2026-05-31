import styled from "styled-components";
import { headerAlignedPadding } from "@/styles/layout";

export const TermContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    padding-top: 64px;
    padding-bottom: 91px;
    background-color: ${({theme}) => theme.colors.grayScale["10"]};
    ${headerAlignedPadding}
`;

export const TermWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 1200px;
    box-sizing: border-box;
    padding: clamp(28px, 4vw, 40px) clamp(20px, 6vw, 100px);
    flex-direction: column;
    align-items: center;
    gap: 40px;
    border-radius: 20px;
    background: #FFF;
`;

export const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`;

export const MainTitle = styled.p`
    ${({theme}) => theme.typography.head.H1};
    color: #000;
`;

export const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({theme}) => theme.colors.grayScale["07"]};
`;

export const InfoBox = styled.div`
    ${({theme}) => theme.typography.body.S0};
    color: #000;
    white-space: pre-wrap;
`;

export const BodyBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    align-self: stretch;
`;

export const BodyTitle = styled.p`
    ${({theme}) => theme.typography.head.H3};
    color: #000;
`;

export const BodyText = styled.p`
    ${({theme}) => theme.typography.body.S0};
    color: #000;
    white-space: pre-wrap;
`;