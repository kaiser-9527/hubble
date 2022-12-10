import { User } from "@supabase/supabase-js";

export interface TUserMetadata {
  name: string;
  email: string;
  avatar_url: string;
  full_name: string;
}

export interface TUser extends User {
  user_metadata: TUserMetadata;
}

export interface TOverView {
  total: number;
  pure: number;
}
