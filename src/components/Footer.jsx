import styled from 'styled-components';
import bannerBg from '../assets/bannerBg.png';

const StFooter = styled.footer`
  background-image: url(${bannerBg});
  background-size: 100% 120px;
  background-position-y: bottom;
  background-repeat: no-repeat;
  height: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: white;
`;

function Footer() {
  return (
    <StFooter>
      <p>Copyright ©2023 Yongseung Song.</p>
    </StFooter>
  );
}

export default Footer;
