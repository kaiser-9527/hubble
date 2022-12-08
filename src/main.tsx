import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "@unocss/reset/tailwind.css";
import "uno.css";
import routes from "~react-pages";
import { getSupabaseUser } from "./utils/supabase";
import db from "./utils/db";

getSupabaseUser((user) => db.init(user?.id));

const App = () => {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <App />
  </Router>
);
