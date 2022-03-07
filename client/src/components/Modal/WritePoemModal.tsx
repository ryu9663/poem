import { useMutation } from "@apollo/client";

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { CREATE_POEMS, GET_POEMS } from "../../apollo/queries/poems";

const ModalWrapper = styled.section`
  background: white;
  padding: 20px;
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
const FlexRow = styled.div`
  display: flex;
`;
const InputWrapper = styled.div`
  height: 50px;
  padding: 10px;
  margin: 20px;
  border: 1px gray solid;
  position: relative;
  input,
  textarea {
    height: 100%;
    width: 100%;
    border: none;
  }
  input:focus {
    outline: none;
  }
  &.input-wrapper__title {
    height: 50px;
    width: 200px;
  }
  &.input-wrapper__author {
    height: 50px;
    width: 200px;
  }
  &.input-wrapper__text {
    height: 300px;
  }
`;
const ButtonWrapper = styled.div`
  margin: 20px auto 0;
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
const WritePoemModal: React.FC<ModalProps> = ({ handleCloseModal }) => {
  const [poemInfo, setPoemInfo] = useState({ title: "", author: "", text: "" });
  const [addPoem, { data, loading, error }] = useMutation(CREATE_POEMS, {
    refetchQueries: [GET_POEMS, "Poems"],
  });
  const { title, author, text } = poemInfo;
  const handleClickOuter = (e: React.MouseEvent<HTMLElement>) => {
    handleCloseModal && handleCloseModal();
    e.stopPropagation();
  };
  useEffect(() => {
    //로딩true -> 데이터 -> 로딩false
    //데이터가 변경되면 모달창을 닫는다.
    if (data) handleCloseModal && handleCloseModal();
  }, [data]);

  const createPoemFunc = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    addPoem({ variables: poemInfo });
  };

  const valueHandler =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setPoemInfo({ ...poemInfo, [key]: e.target.value });
    };
  if (error) {
    return (
      <ModalWrapper>
        <span>Error...</span>
      </ModalWrapper>
    );
  } else
    return (
      <ModalWrapper>
        {loading ? (
          <span>loading...</span>
        ) : (
          <>
            <button className="modal-exit" onClick={handleClickOuter}>
              나가기
            </button>

            <form onSubmit={(e) => createPoemFunc(e)}>
              <h2>시 작성</h2>
              <FlexRow>
                <InputWrapper className="input-wrapper__title">
                  <input
                    className="poem-modal__title"
                    type="text"
                    value={title}
                    onChange={valueHandler("title")}
                    placeholder="시 제목 입력"
                  />
                </InputWrapper>
                <InputWrapper className="input-wrapper__author">
                  <input
                    className="poem-modal__author"
                    type="text"
                    value={author}
                    onChange={valueHandler("author")}
                    placeholder="작가 이름 입력"
                  />
                </InputWrapper>
              </FlexRow>
              <InputWrapper className="input-wrapper__text">
                <textarea
                  className="poem-modal__text"
                  value={text}
                  onChange={valueHandler("text")}
                  required
                  placeholder="내용 입력"
                />
              </InputWrapper>

              <ButtonWrapper>
                <button type="submit">작성</button>
              </ButtonWrapper>
            </form>
          </>
        )}
      </ModalWrapper>
    );
};

export default WritePoemModal;
