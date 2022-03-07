import React from "react";
import styled from "styled-components";

type ModalProps = {
  handleCloseModal?: () => void;
};

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;

  .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin: 0 auto;
  }
`;

export const Modal: React.FC<ModalProps> = ({ handleCloseModal, children }) => {
  const handleClickOuter = (e: React.MouseEvent<HTMLElement>) => {
    handleCloseModal && handleCloseModal();
    e.stopPropagation();
  };

  const handleClickInner = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <ModalWrapper onClick={handleClickOuter}>
      <div className="inner" onClick={handleClickInner}>
        {children}
      </div>
    </ModalWrapper>
  );
};
