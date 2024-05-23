import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/newpost",
    element: <NewPost></NewPost>,
  },
]);
root.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    {/* <App>
        <RouterProvider router={router} />
      </App> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
