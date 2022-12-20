import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { API_URL } from "../../constants/defaultUrl";

// interface INext {
//   setNextPage: (value: boolean) => void;
// }

interface INext {
  setNextPage: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
}

interface IFormValue {
  email: string;
  password: string;
  passwordConfirm: string;
}

function JoinMember({ setNextPage, setUserInfo }: INext) {
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm<IFormValue>({ mode: "onChange" });

  // interface IJoin {
  //   email: string;
  //   password: string;
  // }

  // type IMessage = {
  //   message: string;
  // };

  interface IMessage {
    message: string;
  }

  const getEmailValid = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const reqData = {
      user: { email: getValues().email },
    };
    const { data } = await axios.post(
      `${API_URL}/user/emailvalid`,
      reqData,
      config
    );
    return data;
  };

  const onSubmit = async ({ email, password }: any) => {
    if (isValid) {
      try {
        const response: IMessage = await getEmailValid();

        if (response.message === "사용 가능한 이메일 입니다.") {
          setNextPage(false);
          setUserInfo({ email, password });
          //어느 변수에 이메일,패스워드 담아서
        }
        if (response.message === "이미 가입된 이메일 주소 입니다.") {
          setEmailErrorMessage(response.message);
        }
      } catch {
        console.log("실패");
      }
    }
  };

  return (
    <>
      <SignContainer>
        <SignForm onSubmit={handleSubmit(onSubmit)}>
          <SignFormTitle>회원가입</SignFormTitle>
          <SignFormBox>
            <SignFormLabel htmlFor="email">
              이메일
              <SignFormInput
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
              {emailErrorMessage && (
                <ErrorMessage>{emailErrorMessage}</ErrorMessage>
              )}
            </SignFormLabel>

            <SignFormLabel htmlFor="password">
              비밀번호
              <SignFormInput
                placeholder="비밀번호를 설정해 주세요."
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
            </SignFormLabel>

            <SignFormLabel htmlFor="password">
              비밀번호 재확인
              <SignFormInput
                id="password"
                placeholder="비밀번호를 다시 한번 입력해주세요."
                type="password"
                {...register("passwordConfirm", {
                  required: true, //자바스크립트를 사용해서 validation을 실행
                })}
              />
              {watch("passwordConfirm") !== watch("password") &&
                (getValues("passwordConfirm") ? (
                  <ErrorMessage>* 비밀번호가 일치하지 않습니다.</ErrorMessage>
                ) : null)}
            </SignFormLabel>

            <SignFormBtn disabled={!isValid}>다음</SignFormBtn>
          </SignFormBox>
        </SignForm>
      </SignContainer>
    </>
  );
}

export default JoinMember;

const SignContainer = styled.div`
  max-width: 20rem;
  margin: auto;
`;

const SignForm = styled.form`
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

const SignFormTitle = styled.h1`
  font-size: 2rem;
  margin: 0 0 1.5rem;
`;

const SignFormBox = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SignFormLabel = styled.label`
  font-size: 0.8rem;
`;

const SignFormInput = styled.input`
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

const SignFormBtn = styled.button`
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
