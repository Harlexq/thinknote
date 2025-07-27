export const getStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const setStorage = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const removeStorage = (key: string) => {
  return localStorage.removeItem(key);
};

export const clearStorage = () => {
  return localStorage.clear();
};
