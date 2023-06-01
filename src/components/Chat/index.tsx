import ChatMessage from "../ChatMessage";
import { useTwitchAuth } from "../../contexts/TwitchAuthProvider";
import ErrorComponent from "../ErrorComponent";
import { useTwitchResources } from "../../contexts/TwitchResourcesProvider";

const Chat = () => {
  const twitchAuth = useTwitchAuth();
  const { messages, globalBadgesError } = useTwitchResources();

  return (
    <div className="w-screen min-h-screen flex flex-col items-center overflow-hidden relative">
      <article className="container max-w-3xl grow flex flex-col justify-end absolute bottom-8 px-8 py-4">
        {messages.map((message, i) => {
          const previousMessage = messages[i - 1];
          const nextMessage = messages[i + 1];
          const isUsersFirstMessage =
            previousMessage?.username !== message.username;
          const isUsersLastMessage = nextMessage?.username !== message.username;
          return (
            <ChatMessage
              key={message.id}
              message={message}
              isUsersFirstMessage={isUsersFirstMessage}
              isUsersLastMessage={isUsersLastMessage}
            />
          );
        })}
        {!!globalBadgesError && (
          <ErrorComponent
            title="Something went wrong while requesting the global badges:"
            error={globalBadgesError}
          />
        )}
        {twitchAuth.error ? (
          <ErrorComponent
            title="Something went wrong while authenticating with Twitch:"
            error={twitchAuth.error}
          />
        ) : (
          !twitchAuth.isLoading &&
          !twitchAuth.isAuthenticated && (
            <div className="py-4 flex justify-end">
              <button
                className="bg-button-primary hover:bg-button-primary-hover text-teal-50 font-medium rounded-md py-3 px-8 transition duration-500"
                onClick={() => twitchAuth.goToLogin()}
              >
                Login with Twitch for more features
              </button>
            </div>
          )
        )}
      </article>
    </div>
  );
};

export default Chat;
// y algo asi? bg-teal-100 hover:bg-white text-teal-800 rounded-full py-3 px-8 shadow-md hover:shadow-2xl transition duration-500
