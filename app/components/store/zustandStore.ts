import { create } from "zustand";

interface TokenStore {
  token: string | null;
  setToken: (token: string | null) => void;
}

const useToken = create<TokenStore>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));

export default useToken;
