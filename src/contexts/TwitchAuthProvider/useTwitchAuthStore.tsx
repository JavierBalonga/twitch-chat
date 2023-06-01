import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TwitchAuthState {
  state: string | null;
  setState: (state: string | null) => void;

  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

export interface TwitchAuthMethods {}

export type TwitchAuthStore = TwitchAuthState & TwitchAuthMethods;

const useTwitchAuthStore = create(
  persist<TwitchAuthStore>(
    (set) => ({
      state: null,
      setState: (state: string | null) => set({ state }),

      accessToken: null,
      setAccessToken: (accessToken: string | null) => set({ accessToken }),
    }),
    { name: "twitch-auth" }
  )
);

export default useTwitchAuthStore;
