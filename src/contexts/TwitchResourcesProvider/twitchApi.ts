import axios from "axios";

const { VITE_TWITCH_CLIENT_ID } = import.meta.env;

const twitchApi = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    "Client-ID": VITE_TWITCH_CLIENT_ID,
  },
});

export default twitchApi;
