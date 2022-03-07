import React from "react";
import styled from "styled-components";

const Btn = styled.button`
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
`;

type Props = {
  title: string;
  onClick?: () => void;
};
function Button({ title, onClick }: Props) {
  return <div>{!onClick ? <Btn>{title}</Btn> : <Btn onClick={onClick}>{title}</Btn>}</div>;
}

export default Button;
