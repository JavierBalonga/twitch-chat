import Chat from "./components/Chat";
import { TwitchAuthProvider } from "./contexts/TwitchAuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { TwitchResourcesProvider } from "./contexts/TwitchResourcesProvider";

const { VITE_TWITCH_CLIENT_ID } = import.meta.env;

const queryClient = new QueryClient();

function App() {
  return (
    <TwitchAuthProvider clientId={VITE_TWITCH_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <TwitchResourcesProvider>
          <Chat />
        </TwitchResourcesProvider>
      </QueryClientProvider>
    </TwitchAuthProvider>
  );
}

export default App;
