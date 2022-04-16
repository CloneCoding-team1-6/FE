import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, height, margin, padding, bg, children, center, right, lineheight } = props;


  return (
    <React.Fragment>
      <GridBox {...props}>{children}</GridBox>
    </React.Fragment>
  );
};


Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  bg: false,
  right: false,
  lineheight: "",
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.bg ? `background: ${props.bg};` : "")};
  ${(props) => (props.is_flex ? `display: flex; align-items: center;` : "")};
  ${(props) => (props.center ? `text-align: center; align-items: center;` : "")};
  ${(props) => (props.right ? `text-align: right; align-items: right;` : "")};
  ${(props) => (props.lineheight ? `line-height: ${props.lineheight};` : "")};
`;

export default Grid;
