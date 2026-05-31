import styled from "styled-components";

export const StudentReportContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1600px;
    box-sizing: border-box;
    flex-direction: column;
    align-items: flex-start;
    gap: 48px;
`;

export const SearchListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    gap: 24px;
`;

export const SearchBlock = styled.div`
    display: flex;
    padding-left: 8px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    gap: 16px;
    flex-wrap: wrap;

    @media (max-width: 640px) {
        padding-left: 0;
        flex-direction: column;
        align-items: stretch;
    }
`;

export const TotalCount = styled.p`
    ${({theme}) => theme.typography.head.H4};
    color: ${({theme}) => theme.colors.grayScale["05"]};
    white-space: nowrap;
    flex-shrink: 0;
`;

export const SearchBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;

    @media (max-width: 640px) {
        width: 100%;
        flex-direction: column;
        align-items: stretch;
    }
`;

export const ListBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
`;

export const EmptyListWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 630px;
    padding: 218px 0;
    justify-content: center;
    align-items: center;
`;

export const EmptyReportWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 630px;
`;