import styled from "styled-components";
import { useState } from "react";
import { ValidationStyle } from "../styled/style";
import { errorMessage } from "../../util/message";
import { signUpModalHandler } from "../../apollo/stores/modal-stores/sigunUpModal";
import { loginHandler } from "../../apollo/stores/isLogin";

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
  button {
    border: none;
    border-radius: 10px;
    position: absolute;
    right: 5px;
    top: 15px;
    height: 30px;
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
const SignupModal: React.FC<ModalProps> = ({ handleCloseModal }) => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    user_image_path: "/images/men.png",
    user_thumbnail_path: "/images/men.png",
  });
  const [idCheckPass, setIdCheckPass] = useState(true);
  const handleClickOuter = (e: React.MouseEvent<HTMLElement>) => {
    handleCloseModal && handleCloseModal();
    e.stopPropagation();
  };

  const signUpHandlerFunc = (e: React.FormEvent) => {
    e.preventDefault();
    signUpModalHandler(false);
    //회원가입 완료되었습니다. 로그인 해주세요. 메시지 전달해야함
  };
  return (
    <ModalWrapper>
      <button className="modal-exit" onClick={handleClickOuter}>
        나가기
      </button>
      <form onSubmit={(e: React.FormEvent) => signUpHandlerFunc(e)}>
        <h2>회원가입</h2>
        <InputWrapper>
          <input
            className="login-modal__id"
            value={userInfo.id}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                ...{ id: e.target.value },
              })
            }
            type="text"
            placeholder="아이디를 입력하세요"
          />
          <button type="button" onClick={() => setIdCheckPass(false)}>
            중복확인
          </button>
          {idCheckPass ? null : (
            <ValidationStyle.Validation>{"이미 중복되는 아이디가 있습니다."}</ValidationStyle.Validation>
          )}
        </InputWrapper>
        <InputWrapper>
          <input
            className="login-modal__pw"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                ...{ password: e.target.value },
              })
            }
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            className="login-modal__pw"
            value={userInfo.passwordConfirm}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                ...{ passwordConfirm: e.target.value },
              })
            }
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
          />
          {userInfo.password !== userInfo.passwordConfirm ? (
            <ValidationStyle.Validation>비밀번호를 다시 확인해주세요.</ValidationStyle.Validation>
          ) : null}
        </InputWrapper>
        <ButtonWrapper>
          <button type="submit">회원가입</button>
        </ButtonWrapper>
      </form>
    </ModalWrapper>
  );
};

export default SignupModal;
