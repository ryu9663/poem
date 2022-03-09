import styled from "styled-components";
import { loginHandler } from "../../apollo/stores/isLogin";
import { loginModalHandler } from "../../apollo/stores/modal-stores/loginModal";
import { signUpModalHandler } from "../../apollo/stores/modal-stores/sigunUpModal";

const ModalWrapper = styled.section`
  background: white;
  padding: 70px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .modal-exit {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;
const InputWrapper = styled.div`
  height: 50px;
  padding: 10px;
  width: 400px;
  margin: 20px;
  border: 1px gray solid;
  position: relative;
  span {
    position: absolute;
    left: 10px;
  }
  input {
    height: 30px;
    width: 330px;
    display: block;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  input:focus {
    outline: none;
  }
`;
const ButtonWrapper = styled.div`
  margin: 40px auto;
  display: flex;
  border: none;
  background: none;
  justify-content: center;
  button {
    margin: 0 30px;
    width: 100px;
    padding: 10px;
    background: linear-gradient(to right, #00eeff, pink);
    border-radius: 10px;
    border: none;
    &:hover {
      background: linear-gradient(to left, #faea0c, #97e9ac);
      cursor: pointer;
    }
  }
`;

type ModalProps = {
  handleCloseModal?: () => void;
};
const LoginModal: React.FC<ModalProps> = ({ handleCloseModal }) => {
  const handleClickOuter = (e: React.MouseEvent<HTMLElement>) => {
    handleCloseModal && handleCloseModal();
    e.stopPropagation();
  };

  const loginHandlerFunc = (e: React.FormEvent) => {
    e.preventDefault();
    loginHandler(true);
    loginModalHandler(false);
  };
  return (
    <ModalWrapper>
      <button className="modal-exit" onClick={handleClickOuter}>
        나가기
      </button>
      <form onSubmit={(e: React.FormEvent) => loginHandlerFunc(e)}>
        <h2>로그인</h2>
        <InputWrapper>
          <input className="login-modal__id" type="text" placeholder="아이디를 입력하세요" />
        </InputWrapper>
        <InputWrapper>
          <input className="login-modal__pw" type="password" placeholder="비밀번호를 입력하세요" />
        </InputWrapper>
        <ButtonWrapper>
          <button type="submit">로그인</button>
          <button
            type="button"
            onClick={() => {
              signUpModalHandler(true);
              loginModalHandler(false);
            }}
          >
            회원가입
          </button>
        </ButtonWrapper>
      </form>
    </ModalWrapper>
  );
};

export default LoginModal;
