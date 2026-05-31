import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 56px 0;

  @media (max-width: 960px) {
    padding: 40px 0;
  }
`;

export const TextBlock = styled.div`
  padding: 0 48px;
  box-sizing: border-box;

  h2 {
    ${({ theme }) => theme.typography.head.H2};
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.5px;

    &:not(:last-child) {
      margin-bottom: 6px;
    }
  }

  @media (max-width: 520px) {
    padding: 0 24px;

    h2 {
      font-size: 26px;
      line-height: 38px;
    }
  }
`;

export const SubText = styled.p`
  margin: 18px 48px 0;
  ${({ theme }) => theme.typography.body.M0};
  color: rgba(255, 255, 255, 0.82);

  @media (max-width: 520px) {
    margin: 14px 24px 0;
    ${({ theme }) => theme.typography.body.S0};
  }
`;

export const FeatureBlocksWrapper = styled.div`
  width: 100%;
  padding: 44px 40px 0 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 14px;
  align-items: stretch;

  @media (max-width: 520px) {
    padding: 32px 24px 0 24px;
    flex-wrap: wrap;
  }
`;

export const FeatureBlock = styled.div`
  flex: 1 1 0;
  margin: 0;
  min-width: 0;
  container-type: inline-size;
  background-color: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: ${({ theme }) => theme.radius.md};
  box-sizing: border-box;
  backdrop-filter: blur(2px);
  transition: ${({ theme }) => theme.transitions.base};

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 520px) {
    flex-basis: calc(50% - 7px);
  }
`;

export const FeatureBlockContent = styled.div`
  height: 100%;
  padding: 22px 14px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const FeatureBlockIcon = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.full};
  background: rgba(255, 255, 255, 0.92);

  svg {
    display: block;
    width: 28px;
    height: 28px;
  }
`;

export const FeatureBlockTitle = styled.p`
  ${({ theme }) => theme.typography.body.S2};
  color: #ffffff;
  margin: 0;
  text-align: center;
  line-height: 1.4;
`;

export const ButtonWrapper = styled.div`
  padding: 152px 0 30px 40px;
`;
