import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import randomString from "../../utils/randomString";
import useTwitchAuthStore, { TwitchAuthStore } from "./useTwitchAuthStore";

export interface TwitchAuthContext
  extends Pick<TwitchAuthStore, "accessToken"> {
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  goToLogin: () => void;
}

const Context = createContext<TwitchAuthContext | null>(null);

export interface TwitchAuthProviderProps {
  children: ReactNode;
  clientId: string;
  scopes?: string[];
}

export const TwitchAuthProvider = ({
  children,
  clientId,
  scopes = [],
}: TwitchAuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { state, setState, accessToken, setAccessToken } = useTwitchAuthStore();

  useEffect(() => {
    const actualUrl = new URL(window.location.href);
    const hashParams = new URLSearchParams(actualUrl.hash.substr(1));

    /* prettier-ignore */
    const urlState = actualUrl.searchParams.get("state") || hashParams.get("state");
    /* prettier-ignore */
    const errorCode = actualUrl.searchParams.get("error") || hashParams.get("error");
    /* prettier-ignore */
    const errorDescription = actualUrl.searchParams.get("error_description") || hashParams.get("error_description");
    /* prettier-ignore */
    const newAccessToken = actualUrl.searchParams.get("access_token") || hashParams.get("access_token");

    if (urlState !== null && urlState !== state) {
      setError(new Error("State does not match"));
    } else if (errorCode !== null && errorDescription !== null) {
      setError(new Error(errorDescription || errorCode));
    } else if (newAccessToken !== null) {
      setAccessToken(newAccessToken);
    }
    setIsLoading(false);

    actualUrl.searchParams.delete("state");
    actualUrl.searchParams.delete("error");
    actualUrl.searchParams.delete("error_description");
    actualUrl.searchParams.delete("access_token");
    actualUrl.hash = "";

    window.history.replaceState({}, "", actualUrl.toString());
  }, []);

  const isAuthenticated = useMemo(() => accessToken !== null, [accessToken]);

  const goToLogin = useCallback(() => {
    const newState = randomString(32);
    setState(newState);
    const loginUrl = new URL("https://id.twitch.tv/oauth2/authorize");
    loginUrl.searchParams.append("response_type", "token");
    loginUrl.searchParams.append("client_id", clientId);
    loginUrl.searchParams.append("redirect_uri", window.location.href);
    loginUrl.searchParams.append("scope", scopes.join(" "));
    loginUrl.searchParams.append("state", newState);
    window.location.replace(loginUrl.toString());
  }, [clientId, scopes]);

  return (
    <Context.Provider
      value={{
        accessToken,
        isLoading,
        error,
        isAuthenticated,
        goToLogin,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTwitchAuth = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error(
      "useTwitchAuthProvider has to be inside a TwitchAuthProvider"
    );
  }
  return context;
};
