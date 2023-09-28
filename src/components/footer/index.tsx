import LazzoneIconSvg from '../../assets/lazzoneIcon';
import { StyledFooter, StyledFooterText, StyledFooterWrapper } from './style';

export default function Footer() {
  return (
    <StyledFooterWrapper>
      <StyledFooter>
        <LazzoneIconSvg />
        <div>
          <StyledFooterText>© 2023</StyledFooterText>
        </div>
        <StyledFooterText>CyberDranic team</StyledFooterText>
      </StyledFooter>
    </StyledFooterWrapper>
  );
}
