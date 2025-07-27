import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import {
  fetchForgotPassword,
  fetchLogin,
  fetchLogout,
  fetchRegister,
} from "../lib/services/authService";
import { LoginSchema } from "../schema/loginSchema";
import { RegisterSchema } from "../schema/registerSchema";
import { ForgotPasswordSchema } from "../schema/forgotPasswordSchema";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { error, loading, isAuth } = useAppSelector((state) => state.auth);

  const login = useCallback(
    async (data: LoginSchema) => {
      await dispatch(fetchLogin(data));
    },
    [dispatch]
  );

  const register = useCallback(
    async (data: RegisterSchema) => {
      await dispatch(fetchRegister(data));
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    await dispatch(fetchLogout());
  }, [dispatch]);

  const forgotPassword = useCallback(
    async (data: ForgotPasswordSchema) => {
      await dispatch(fetchForgotPassword(data));
    },
    [dispatch]
  );

  return {
    error,
    loading,

    isAuth,

    login,
    register,
    logout,
    forgotPassword,
  };
};

export default useAuth;
