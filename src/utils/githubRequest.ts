import toast from "react-hot-toast";
import { supabase } from "./supabase";

const baseUrl = "https://api.github.com";

export default async <T>(
  url: string,
  { headers, ...options }: RequestInit = {}
) => {
  const { data } = await supabase.auth.getSession();
  if (!data.session?.provider_token) {
    toast.error("Please signin.");
    return Promise.reject(new Error("Please signin"));
  }

  return fetch(baseUrl + url, {
    headers: {
      ...headers,
      Authorization: `Bearer ${data.session!.provider_token}`,
    },
    ...options,
  }).then((res) => res.json() as T);
};
