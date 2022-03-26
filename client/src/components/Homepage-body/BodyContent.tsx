import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import React, { PropsWithChildren, useEffect, useState } from "react";

import { writePoemModalHandler } from "../../apollo/stores/modal-stores/writePoemModal";

import { GET_POEMS } from "../../apollo/queries/poems";
import Button from "../styled/Button";
import { PoemType } from "../../types/poem";
import styled from "styled-components";
import { GET_POEM_BY_AUTHOR } from "../../apollo/queries/searching";

const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  .bodycontent__searchbox-wrapper {
    /* background: red; */
    display: flex;
    margin: 80px 10px;
    width: 600px;
    height: 70px;
  }
  .bodycontent__searchbox {
    width: 100%;
    padding: 10px;
    font-size: 1.5rem;
  }
`;
const BtnWrapper = styled.section`
  margin: 30px auto;
  display: flex;
`;
const PoemListWrapper = styled.section``;

const PoemList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;
const PoemWrapper = styled.div`
  border: 1px gray solid;
`;
const Poem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 80px;
`;
const PoemTitle = styled.h3`
  margin: 0 auto;
`;
const PoemContent = styled.div`
  margin-top: 40px;
`;
const PoemAuthor = styled.span`
  position: absolute;
  top: 70px;
  right: 20px;
`;

export const BodyContent = () => {
  const [author, setAuthor] = useState("");
  const [searchText, setSearchText] = useState("");
  const [poemList, setPoemList] = useState([]);

  const [
    searchPoemByAuthor,
    { data: searchingByAuthorData, loading: searchingByAuthorLoading, error: searchingByAuthorError },
  ] = useLazyQuery(GET_POEM_BY_AUTHOR, {
    variables: { author: searchText },
    fetchPolicy: "network-only",
  });

  const { loading: poemLoading, error: poemError, data: poemData } = useQuery(GET_POEMS);

  useEffect(() => {
    if (!searchingByAuthorData) return;
    //검색어에의한 poemList 변경
    setPoemList(searchingByAuthorData.poemByAuthor);
  }, [searchingByAuthorData]);

  useEffect(() => {
    if (!poemData) return;
    const { poems } = poemData;
    //poemList는 화면에 렌더링되는 시
    setPoemList(poems);
  }, [poemData]);

  if (poemLoading || searchingByAuthorLoading) return <span>"로딩중"</span>;
  if (poemError || !poemData || searchingByAuthorError) return <span>Error...</span>;

  const searchTextHandler = (text: string) => {
    setSearchText(text);
    searchPoemByAuthor();
  };

  return (
    <BodyWrapper>
      <div className="bodycontent__searchbox-wrapper">
        <input
          className="bodycontent__searchbox"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          type="text"
          placeholder="작가이름 또는 시를 검색해보세요 "
        />
        <button onClick={() => searchTextHandler(author)}>검색</button>
        <button onClick={() => setPoemList(poemData.poems)}>전체보기</button>
      </div>
      <BtnWrapper>
        <Button title="시 작성" onClick={() => writePoemModalHandler(true)} />
      </BtnWrapper>
      <PoemListWrapper>
        <PoemList>
          {poemList?.map((poem: PoemType) => (
            <div key={poem.id}>
              <PoemListComponent poem={poem} />
            </div>
          ))}
        </PoemList>
      </PoemListWrapper>
    </BodyWrapper>
  );
};

const PoemListComponent = React.memo(
  ({ poem }: { poem: PoemType }) => {
    let htmlText;
    if (poem.poem.text) {
      htmlText = (poem.poem.text[0] as unknown as string).split("\n");
    }
    return (
      <PoemWrapper key={poem.id}>
        <Poem>
          <PoemTitle>{poem.poem.title}</PoemTitle>
          <PoemAuthor>{poem.author}</PoemAuthor>
          <PoemContent>{poem.poem.text}</PoemContent>
        </Poem>
      </PoemWrapper>
    );
  },
  (prev: Readonly<PropsWithChildren<{ poem: PoemType }>>, next: Readonly<PropsWithChildren<{ poem: PoemType }>>) => {
    return prev.poem.id === next.poem.id;
  }
);
