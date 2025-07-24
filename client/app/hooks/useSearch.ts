import { useAppSelector, useAppDispatch } from "../lib/hook";
import { closeSearch, openSearch } from "../lib/slices/searchSlice";

const useSearch = () => {
  const dispatch = useAppDispatch();
  const { isOpenSearch, sought } = useAppSelector((state) => state.search);

  const handleOpenSearch = () => {
    dispatch(openSearch());
  };

  const handleCloseSearch = () => {
    dispatch(closeSearch());
  };

  return {
    isOpenSearch,
    sought,
    handleOpenSearch,
    handleCloseSearch,
  };
};

export default useSearch;
