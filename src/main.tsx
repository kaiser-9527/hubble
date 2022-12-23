import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "~/styles/reset.css";
import "uno.css";
import routes from "~react-pages";
import UserProvider from "./components/context/user";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">loading...</div>
      }
    >
      {useRoutes(routes)}
    </Suspense>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>
);
