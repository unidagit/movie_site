// interface IUserInfo {
//   email: string;
//   password: string;
// }

import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import defaultProfilePhoto from "../../assets/basic-profile-img-.svg";
import fileUploadButton from "../../assets/upload-file.svg";
import { API_URL } from "../../constants/defaultUrl";

export interface IFormValue {
  email: string;
  password: string;
  passwordConfirm?: string;
  username?: string;
  accountname?: string;
  introduce?: string;
  filename?: string;
}

function JoinProfile({ userInfo }: any) {
  const ProfileUploadInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [myPreviewImage, setPreviewImage] = useState("");
  const [myImage, setMyImage] = useState("");
  const [accountnameErrorMessage, setAccountnameErrorMessage] = useState("");

  //버튼 클릭했을때
  const handleClickFileInput = () => {
    if (!ProfileUploadInput.current) {
      return;
    }
    ProfileUploadInput.current?.click();
  };

  const uploadProfile = (e: any) => {
    if (!e.target.files) {
      return;
    }

    const nowInageUrl = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(nowInageUrl);
    setMyImage(e.target.files[0]);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm<IFormValue>({ mode: "onChange" });

  const getaccoutNameValid = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const reqData = {
      user: { accountname: getValues().accountname },
    };
    try {
      const { data } = await axios.post(
        `${API_URL}/user/accountnamevalid`,
        reqData,
        config
      );
      return data;
    } catch {
      console.log("error");
    }
  };

  const imageUploadHandler = async () => {
    const formData = new FormData();
    formData.append("image", myImage);
    const res = await axios.post(`${API_URL}/image/uploadfile`, formData);
    console.log(res);
    return res.data.filename;
  };

  const getJoinProfile = async (data: any) => {
    const { username, accountname, introduce } = data;
    const { email, password } = userInfo;
    const image = await imageUploadHandler();

    const config = {
      user: {
        username: username,
        email: email,
        password: password,
        accountname: accountname,
        intro: introduce,
        image: `https://mandarin.api.weniv.co.kr/${image}`,
      },
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const response = await axios.post(`${API_URL}/user`, config);
      console.log(response);
      if (response.data.message === "회원가입 성공") {
        navigate("/login");
      }
    } catch {
      console.log("error");
    }
  };

  const onSubmit: SubmitHandler<IFormValue> = async (data) => {
    if (isValid) {
      try {
        const response = await getaccoutNameValid();

        if (response.message === "사용 가능한 계정ID 입니다.") {
          getJoinProfile(data);
        } else if (response.message === "이미 가입된 계정ID 입니다.") {
          setAccountnameErrorMessage(response.message);
        }
      } catch {
        console.log("error");
      }
    }
  };

  return (
    <>
      <SignProfileContainer>
        <SignProfileForm onSubmit={handleSubmit(onSubmit)}>
          <SignProfileFormTitle>프로필 설정</SignProfileFormTitle>
          <SignProfileFormBox>
            <SignProfileImage
              src={myPreviewImage ? myPreviewImage : defaultProfilePhoto}
            />
            <SignProfileImgContainer>
              <SignProfileInput
                ref={ProfileUploadInput}
                onChange={uploadProfile}
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                id="filename"
              />
              <SignProfileInputButton onClick={handleClickFileInput} />
            </SignProfileImgContainer>

            <SignFormLabel htmlFor="username">
              사용자 이름
              <SignFormInput
                placeholder="2~10자 이내여야 합니다."
                id="username"
                type="text"
                {...register("username", {
                  required: true, //자바스크립트를 사용해서 validation을 실행
                  minLength: 2,
                  maxLength: 6,
                })}
              />
              {errors.username?.type === "required" && (
                <ErrorMessage>* 필수 입력사항입니다.</ErrorMessage>
              )}
              {errors.username?.type === "minLength" ||
                (errors.username?.type === "maxLength" && (
                  <ErrorMessage>* 2~10자 이내여야 합니다.</ErrorMessage>
                ))}
            </SignFormLabel>

            <SignFormLabel htmlFor="id">
              계정 ID
              <SignFormInput
                placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
                id="accountname"
                type="text"
                {...register("accountname", {
                  required: true, //자바스크립트를 사용해서 validation을 실행
                  pattern: /^[-._a-z0-9]+$/gi,
                })}
              />
              {errors.accountname?.type === "required" && (
                <ErrorMessage>* 필수 입력사항입니다.</ErrorMessage>
              )}
              {errors.accountname?.type === "pattern" && (
                <ErrorMessage>
                  * 영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.
                </ErrorMessage>
              )}
              {accountnameErrorMessage && (
                <ErrorMessage>{accountnameErrorMessage}</ErrorMessage>
              )}
            </SignFormLabel>

            <SignFormLabel htmlFor="introduce">
              소개
              <SignFormInput
                placeholder="2~15자 이내여야 합니다."
                id="introduce"
                type="text"
                {...register("introduce", {
                  required: true, //자바스크립트를 사용해서 validation을 실행
                  minLength: 2,
                  maxLength: 15,
                })}
              />
              {errors.introduce?.type === "required" && (
                <ErrorMessage>* 필수 입력사항입니다.</ErrorMessage>
              )}
              {errors.introduce?.type === "minLength" ||
                (errors.introduce?.type === "maxLength" && (
                  <ErrorMessage>* 2~15자 이내여야 합니다.</ErrorMessage>
                ))}
            </SignFormLabel>

            <SignProfileFormBtn disabled={!isValid}>
              넷플릭스 시작하기
            </SignProfileFormBtn>
          </SignProfileFormBox>
        </SignProfileForm>
      </SignProfileContainer>
    </>
  );
}

export default JoinProfile;

const SignProfileContainer = styled.div`
  max-width: 20rem;
  margin: auto;
`;

const SignProfileForm = styled.form`
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

const SignProfileFormTitle = styled.h1`
  font-size: 2rem;
  margin: 0 0 1.5rem;
`;

const SignProfileFormBox = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SignProfileImgContainer = styled.div`
  font-size: 0.8rem;
  margin: 0 auto;
`;

const SignProfileInput = styled.input`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  padding: 0;
`;

const SignProfileImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  background-color: white;
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

const SignProfileInputButton = styled.img.attrs({
  src: fileUploadButton,
  alt: "이미지 업로드",
})``;

const ErrorMessage = styled.strong`
  display: block;
  color: ${(props) => props.theme.red.basic};
  font-size: 0.85rem;
  margin-bottom: 20px;
`;

const SignProfileFormBtn = styled.button`
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
