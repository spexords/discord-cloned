import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 20px;
  border-radius: 4px;
  width: 500px;
  background: rgb(54, 57, 63);
  > h1 {
    font-size: 1.5rem;
    align-self: center;
  }
  > h2 {
    color: ${(props) =>
      props.selected ? "#aeb2b9" : "#72767d"};
    font-size: 1rem;
    align-self: center;
    &::after {
      content: "";
      display: ${(props) => (props.selected ? "block" : "none")};
      height: 3px;
      background-color: white;
    }
  }
`;
