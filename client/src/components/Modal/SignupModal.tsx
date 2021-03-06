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
    //???????????? ?????????????????????. ????????? ????????????. ????????? ???????????????
  };
  return (
    <ModalWrapper>
      <button className="modal-exit" onClick={handleClickOuter}>
        ?????????
      </button>
      <form onSubmit={(e: React.FormEvent) => signUpHandlerFunc(e)}>
        <h2>????????????</h2>
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
            placeholder="???????????? ???????????????"
          />
          <button type="button" onClick={() => setIdCheckPass(false)}>
            ????????????
          </button>
          {idCheckPass ? null : (
            <ValidationStyle.Validation>{"?????? ???????????? ???????????? ????????????."}</ValidationStyle.Validation>
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
            placeholder="??????????????? ???????????????"
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
            placeholder="??????????????? ?????? ??? ???????????????"
          />
          {userInfo.password !== userInfo.passwordConfirm ? (
            <ValidationStyle.Validation>??????????????? ?????? ??????????????????.</ValidationStyle.Validation>
          ) : null}
        </InputWrapper>
        <ButtonWrapper>
          <button type="submit">????????????</button>
        </ButtonWrapper>
      </form>
    </ModalWrapper>
  );
};

export default SignupModal;
