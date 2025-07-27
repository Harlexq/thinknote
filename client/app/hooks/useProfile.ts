import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hook";
import { fetchProfile } from "../lib/services/profileService";

const useProfile = () => {
  const dispatch = useAppDispatch();
  const { error, loading, user } = useAppSelector((state) => state.profile);

  const getProfile = useCallback(async () => {
    await dispatch(fetchProfile());
  }, [dispatch]);

  return {
    error,
    loading,

    user,

    getProfile,
  };
};

export default useProfile;
