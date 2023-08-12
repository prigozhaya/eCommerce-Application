import styled from 'styled-components';

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 35px;
  width: 40%;
  position: relative;

  a {
    margin: 20px 0 0 0;
  }
`;

const StyledInputContainer = styled.div`
  display: contents;
`;

export { StyledLoginForm, StyledInputContainer };
