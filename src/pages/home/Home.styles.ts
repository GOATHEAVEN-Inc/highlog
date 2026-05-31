import styled from 'styled-components';

// 데스크탑 디자인 기준 폭과 모바일 분기점. 데스크탑에선 1440px 시뮬 그대로,
// 그보다 좁아지면 100%로 자연 축소.
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  height: 100%;
  overflow-x: hidden;
  ${props => props.theme.typography.body['L0']}
`;