import styled from "styled-components";

const LoginFormWrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 50px;
    > * {
      max-width: 250px;
    }
    align-items: center;
  }
`;

export default LoginFormWrapper;
