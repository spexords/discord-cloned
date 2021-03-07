import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  background-color: ${(props) => props.color};
  width: 100%;
  height: 1px;
  margin: 20px 0px;
`;

const Separator = (props) => {
  return <Wrapper {...props} />;
};

export default Separator;
