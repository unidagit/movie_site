import React, { useState } from "react";
import JoinMember from "../Components/join/JoinMember";
import JoinProfile from "../Components/join/JoinProfile";

function SignUp() {
  const [nextPage, setNextPage] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      {nextPage ? (
        <JoinMember setNextPage={setNextPage} setUserInfo={setUserInfo} />
      ) : (
        <JoinProfile userInfo={userInfo} />
      )}
    </>
  );
}

export default SignUp;
