import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 3px solid ${({ theme }) => theme.colors.primaryScale["100"]};
  border-top-color: ${({ theme }) => theme.colors.primaryScale["500"]};
  animation: ${spin} 0.8s linear infinite;
`;

export default function RouteFallback() {
  return (
    <Wrapper aria-busy="true" aria-live="polite">
      <Spinner />
    </Wrapper>
  );
}
