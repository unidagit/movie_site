import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../constants/defaultUrl";

function Init() {
  // 1. 토큰이 로컬스토리지에 있는지 먼저 확인하고
  // 2. 토큰이 있으면 유효성 검사 실행
  // 3. 토큰 유효성 검사 성공하면 홈으로 이동
  //    토큰 유효성 검사 실패하면 로그인으로 이동
  const [loading, setLoding] = useState(true);
  const navigate = useNavigate();
  const token = JSON.parse(`${localStorage.getItem("token")}`); //로컬스토리지에 토큰 유무여부

  const isValidToken = async (token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    };
    try {
      const response = await axios.get(`${API_URL}/user/checktoken`, config);
      console.log(response);
      setLoding(false);
      if (response.data.isValid === true) {
        navigate("/home");
      } else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("accountname");
        navigate("/login");
      }
    } catch {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (token) {
      //유효성검사 실행
      isValidToken(token);
    } else {
      navigate("/login");
    }
  }, []);

  return <>{loading && <Loader>loading...</Loader>}</>;
}

export default Init;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
