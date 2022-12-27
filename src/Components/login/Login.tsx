import { SubmitHandler, useForm } from "react-hook-form";
import { IFormValue } from "../join/JoinProfile";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/defaultUrl";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IFormValue>({ mode: "onChange" });

  const postLoginUser = async (data: any) => {
    const { email, password } = data;

    const config = {
      user: {
        email: email,
        password: password,
      },
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const response = await axios.post(`${API_URL}/user/login`, config);
      console.log(response);
      if (
        response.data.message === "이메일 또는 비밀번호가 일치하지 않습니다."
      ) {
        setEmailErrorMessage("이메일 또는 비밀번호가 일치하지 않습니다.");

        //토큰값 (사용자이름, 토큰 로컬스토리지에 저장)
      } else {
        localStorage.setItem(
          "accoutname",
          JSON.stringify(response.data.user.accountname)
        );
        localStorage.setItem("token", JSON.stringify(response.data.user.token));
        navigate("/home");
      }
    } catch {
      console.log("error");
    }
  };

  const onSubmit: SubmitHandler<IFormValue> = async (data) => {
    console.log(data);
    if (isValid) {
      try {
        const response = await postLoginUser(data);
        console.log(response);
      } catch {
        console.log("실패");
      }
    }
  };

  return (
    <>
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <LoginFormTitle>로그인</LoginFormTitle>
          <LoginFormBox>
            <LoginFormLabel htmlFor="email">
              이메일
              <LoginFormInput
                placeholder="이메일 주소를 입력해 주세요."
                id="email"
                type="email"
                // name="email"
                {...register("email", {
                  required: true, //자바스크립트를 사용해서 validation을 실행
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              {errors.email?.type === "required" && (
                <ErrorMessage>* 필수 입력사항입니다.</ErrorMessage>
              )}
              {errors.email?.type === "pattern" && (
                <ErrorMessage>* 올바르지 않은 이메일 형식입니다.</ErrorMessage>
              )}
            </LoginFormLabel>

            <LoginFormLabel htmlFor="password">
              비밀번호
              <LoginFormInput
                placeholder="비밀번호를 입력해 주세요."
                id="password"
                type="password"
                {...register("password", {
                  required: true, //자바스크립트를 사용해서 validation을 실행
                  minLength: 6,
                })}
              />
              {errors.password?.type === "required" && (
                <ErrorMessage>* 필수 입력사항입니다.</ErrorMessage>
              )}
              {errors.password?.type === "minLength" && (
                <ErrorMessage>* 비밀번호는 6자 이상이어야 합니다.</ErrorMessage>
              )}
              {emailErrorMessage && (
                <ErrorMessage>{emailErrorMessage}</ErrorMessage>
              )}
            </LoginFormLabel>
            <LoginFormBtn disabled={!isValid}>로그인</LoginFormBtn>
          </LoginFormBox>
        </LoginForm>
        <JoinLink>
          <Link to="/signUp">이메일로 회원가입</Link>
        </JoinLink>
      </LoginContainer>
    </>
  );
}

export default Login;

const LoginContainer = styled.div`
  max-width: 20rem;
  margin: auto;
`;

const LoginForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 280px;
  height: 250px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
`;

const LoginFormTitle = styled.h1`
  font-size: 2rem;
  margin: 0 0 1.5rem;
`;

const LoginFormBox = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LoginFormLabel = styled.label`
  font-size: 0.8rem;
`;

const LoginFormInput = styled.input`
  width: 100%;
  background: #333;
  color: #fff;
  border: none;
  outline: none;
  margin: 0.5rem 0;
  padding: 1rem;
  border-bottom: 2px solid #333;
`;

const ErrorMessage = styled.strong`
  display: block;
  color: ${(props) => props.theme.red.basic};
  font-size: 0.85rem;
  margin-bottom: 20px;
`;

const LoginFormBtn = styled.button`
  border-radius: 4px;
  font-size: 16px;
  color: ${(props) => props.theme.white.lighter};
  margin: 24px 0px 12px;
  padding: 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme.red.basic};
  border: none;

  &:hover {
    background-color: #9c151c;
  }

  :disabled {
    background-color: ${(props) => props.theme.red.lighter};
    border: none;
  }
`;

const JoinLink = styled.button`
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  color: ${(props) => props.theme.white.lighter};
  margin: 24px 0px 12px;
  padding: 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme.red.lighter};
  border: none;

  &:hover {
    background-color: #9c151c;
  }

  :disabled {
    background-color: ${(props) => props.theme.red.lighter};
    border: none;
  }
`;
