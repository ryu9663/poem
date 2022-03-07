import styled from "styled-components";
import isLoginVar, { loginHandler } from "../../apollo/stores/isLogin";
import { useReactiveVar } from "@apollo/client";
import isLoginModalVar, { loginModalHandler } from "../../apollo/stores/modal-stores/loginModal";
import { Modal } from "../Modal/Modal";
import writePoemModalVar, { writePoemModalHandler } from "../../apollo/stores/modal-stores/writePoemModal";
import LoginModal from "../Modal/LoginModal";
import WritePoemModal from "../Modal/WritePoemModal";
import { Link } from "react-router-dom";
import { Styled } from "../styled/style";

const HeaderBody = styled.header`
  display: flex;
  position: relative;
  /* border-bottom: 1px gray solid; */

  .header__title {
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    /* margin: 10px; */

    font-size: 2rem;
  }
  .header__button-wrapper {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    align-self: center;

    button {
      margin: 0 10px;
      padding: 10px;
      width: 100px;
      background: linear-gradient(to right, #00eeff, pink);
      border-radius: 10px;
      border: none;
      &:hover {
        background: linear-gradient(to left, #faea0c, #97e9ac);
        cursor: pointer;
      }
    }
  }
`;
const ModalWrapper = styled.div``;
const Header = () => {
  const loginModalState = useReactiveVar(isLoginModalVar);
  const writePoemModalState = useReactiveVar(writePoemModalVar);
  const isLogin = useReactiveVar(isLoginVar);
  return (
    <HeaderBody>
      <ModalWrapper>
        {loginModalState ? (
          <Modal handleCloseModal={() => loginModalHandler(false)}>
            <LoginModal handleCloseModal={() => loginModalHandler(false)} />
          </Modal>
        ) : null}
        {writePoemModalState ? (
          <Modal handleCloseModal={() => writePoemModalHandler(false)}>
            <WritePoemModal handleCloseModal={() => writePoemModalHandler(false)} />
          </Modal>
        ) : null}
      </ModalWrapper>
      <div className="header__title">
        <Styled.StyledLink to="/">
          <span>Poem</span>
        </Styled.StyledLink>
      </div>

      <div className="header__button-wrapper">
        {!isLogin ? (
          <>
            <button className="header__login" onClick={() => loginModalHandler(true)}>
              로그인
            </button>
            <button className="header__signup">회원가입</button>
          </>
        ) : (
          <>
            <button className="header__login" onClick={() => loginHandler(false)}>
              로그아웃
            </button>
            <button className="header__signup">마이페이지</button>
          </>
        )}
      </div>
    </HeaderBody>
  );
};

export default Header;
