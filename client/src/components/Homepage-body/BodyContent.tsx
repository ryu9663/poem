import { useQuery } from "@apollo/client";

import React, { PropsWithChildren } from "react";

import { writePoemModalHandler } from "../../apollo/stores/modal-stores/writePoemModal";

import { GET_POEMS } from "../../apollo/queries/poems";
import Button from "../styled/Button";
import { PoemType } from "../../types/poem";
import styled from "styled-components";

const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  .bodycontent__searchbox-wrapper {
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
  const { loading, error, data } = useQuery(GET_POEMS);
  if (loading) return <span>"로딩중"</span>;
  if (error) return <span>Error...</span>;
  const { poems } = data;
  return (
    <BodyWrapper>
      <div className="bodycontent__searchbox-wrapper">
        <input className="bodycontent__searchbox" type="text" placeholder="작가이름 또는 시를 검색해보세요 " />
      </div>
      <BtnWrapper>
        <Button title="시 작성" onClick={() => writePoemModalHandler(true)} />
      </BtnWrapper>
      <PoemListWrapper>
        <PoemList>
          {poems.map((poem: PoemType) => (
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
