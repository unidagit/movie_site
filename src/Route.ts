import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }: any) {
  const token = !!localStorage.getItem("token"); //로컬스토리지에 토큰 유무여부
  const navigate = useNavigate();
  return token ? children : navigate("/login"); //토큰있으면~~ 토큰 없으면 로그인페이지로
}

export function PublicRoute({ children }: any) {
  const token = !!localStorage.getItem("token"); //로컬스토리지에 토큰 유무여부
  const navigate = useNavigate();
  return token ? navigate("/home") : children; //토큰있으면 홈으로 토큰 없으면
}
