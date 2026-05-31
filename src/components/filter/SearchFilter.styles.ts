import styled from "styled-components";

export const SearchFilterContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 360px;
    box-sizing: border-box;
    padding: 8px 16px;
    align-items: center;
    gap: 24px;
    border-radius: 999px;
    border: 0.5px solid ${({theme}) => theme.colors.grayScale["08"]};
    background-color: ${({theme}) => theme.colors.grayScale["09"]};
`;

export const TitleIconWrap = styled.div`
    display: flex;
    flex: 1;
    min-width: 0;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.input`
    ${({theme}) => theme.typography.body.M0};
    border: none;
    outline: none;
    background-color: ${({theme}) => theme.colors.grayScale["09"]};;
    color: ${({theme}) => theme.colors.grayScale["00"]};
    width: 100%;
`;