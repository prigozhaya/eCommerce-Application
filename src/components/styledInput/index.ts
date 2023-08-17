import { Field } from 'formik';
import styled from 'styled-components';

const StyledFormInput = styled(Field)`
  background: none;
  color: #cf844e;
  font-family: Arial;
  font-size: 16px;
  padding: 10px 20px;
  border: 1px solid #c4c4c4;
  border-radius: 7px;
  margin: 0;
  max-width: 630px;
  width: -webkit-fill-available;
  outline: 0;
  outline-offset: 0;

  &::placeholder {
    color: #cf844e;
  }
`;

const StyledFormPasswordInputWrapper = styled.div`
  position: relative;
  margin: 0;
`;

const StyledFormPasswordInputIcon = styled.div`
  content: '';
  position: absolute;
  top: 25px;
  bottom: 0;
  right: 10px;
  margin: auto 0;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background: url('/src/assets/password-invisible.svg') no-repeat;

  &.visible {
    top: 14px;
    background: url('/src/assets/password-visible.svg') no-repeat;
  }
`;

export {
  StyledFormInput,
  StyledFormPasswordInputWrapper,
  StyledFormPasswordInputIcon,
};
