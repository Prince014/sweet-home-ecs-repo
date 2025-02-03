import { useSelector } from "react-redux";

export const IsAuthentication = () => {
  const isAuth = useSelector((state) => state.auth?.isAuth);
  console.log({ isAuth });
  return isAuth;
};
