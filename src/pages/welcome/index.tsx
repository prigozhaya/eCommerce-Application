import { StyledBtn, StyledCheckBtn } from '../../components/styledBtn';
import WelcomeWrapper from './style';

export default function Welcome() {
  return (
    <WelcomeWrapper>
      <h1>Hello world</h1>
      <StyledBtn>Open</StyledBtn>
      <StyledBtn $primary>Close</StyledBtn>
      <StyledCheckBtn>Check</StyledCheckBtn>
    </WelcomeWrapper>
  );
}
