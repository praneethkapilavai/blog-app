import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { RootLayout } from "./components/RootLayout.jsx"
import Home from "./components/common/Home.jsx"
import Signup from "./components/common/Signup.jsx"
import Signin from "./components/common/Signin.jsx"
import Articles from "./components/common/Articles.jsx"
import ArticleById from "./components/common/ArticleById.jsx"
import UserProfile from "./components/user/UserProfile.jsx"
import AuthorProfile from "./components/author/authorProfile.jsx"
import PostArticle from "./components/author/PostArticle.jsx"

const browserRouterObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      {
        path: "user-profile/:email", element: <UserProfile />,
        children: [
          { path: "articles", element: <Articles /> },
          { path: ":articleId", element: <ArticleById /> },
          { path: "", element: <Navigate to="articles" /> }
        ]
      },
      {
        path: "author-profile/:email", element: <AuthorProfile />,
        children: [
          { path: "artilces", element: <Articles /> },
          { path: ":articleId", element: <ArticleById /> },
          { path: "newarticle", element: <PostArticle /> },
          { path: "", element: <Navigate to="articles" /> }
        ]
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={browserRouterObj} />
  </StrictMode>,
)

