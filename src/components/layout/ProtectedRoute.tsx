import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  logOut,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { TRole } from "@/types";
import { verifyToken } from "@/utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: TRole | undefined;
};

export default function ProtectedRoute({ children, role }: TProtectedRoute) {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  const dispatch = useAppDispatch();
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  if (role !== undefined && user?.role !== role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
