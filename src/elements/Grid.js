<<<<<<< HEAD
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

=======
import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const { is_flex, width, maxWidth, padding, border, margin, bg, children, center, _onClick } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    maxWidth: maxWidth,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    border: border, 
  }

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  );
}
>>>>>>> f075e85ccce90c0591c4b8a38ddc67fba6f3d063

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
<<<<<<< HEAD
  height: "100%",
  padding: false,
  margin: false,
  bg: false,
  right: false,
  lineheight: "",
=======
  maxWidth: '900px',
  padding: false,
  margin: false,
  bg: false,
  center: false,
  border: false,
  _onClick: () => {},
>>>>>>> f075e85ccce90c0591c4b8a38ddc67fba6f3d063
};

const GridBox = styled.div`
  width: ${(props) => props.width};
<<<<<<< HEAD
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
=======
  max-width: ${(props) => props.maxWidth};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) => (props.is_flex ? `display: flex; align-items: center; justify-content: space-between;` : "")}
  ${(props) => (props.center ? `text-align: center;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
`;

export default Grid;
>>>>>>> f075e85ccce90c0591c4b8a38ddc67fba6f3d063
