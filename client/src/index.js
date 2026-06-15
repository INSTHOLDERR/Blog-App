import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
<<<<<<< HEAD
=======

>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
import Layout from './components/Layout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import PostDetail from './pages/PostDetail.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
<<<<<<< HEAD
import UserProfile from './pages/UserProfile.jsx';
import Authors from './pages/Authors.jsx';
import CreatePost from './pages/CreatePost.jsx';
import EditPost from './pages/EditPost.jsx';
import { AuthorPost, CategoryPosts } from './pages/AuthorPost.jsx';
import Dashboard from './pages/Dashbord.jsx';
import Logout from './pages/Logout.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PublicOnlyRoute from './components/PublicOnlyRoute.jsx';
import AuthProvider from './context/AuthContext.jsx';

const router = createBrowserRouter([{
  path:'/',element:<Layout/>,errorElement:<ErrorPage/>,
  children:[
    {index:true,element:<Home/>},
    {path:'posts/:id',element:<PostDetail/>},
    {path:'register',element:<PublicOnlyRoute><Register/></PublicOnlyRoute>},
    {path:'login',element:<PublicOnlyRoute><Login/></PublicOnlyRoute>},
    {path:'profile/:id',element:<PrivateRoute><UserProfile/></PrivateRoute>},
    {path:'authors',element:<Authors/>},
    {path:'create',element:<PrivateRoute><CreatePost/></PrivateRoute>},
    {path:'posts/categories/:category',element:<CategoryPosts/>},
    {path:'posts/users/:id',element:<AuthorPost/>},
    {path:'myposts/:id',element:<PrivateRoute><Dashboard/></PrivateRoute>},
    {path:'posts/:id/edit',element:<PrivateRoute><EditPost/></PrivateRoute>},
    {path:'logout',element:<Logout/>},
  ],
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router}/></AuthProvider>
  </React.StrictMode>
);
=======
import UserProfile from "./pages/UserProfile.jsx";
import Authors from './pages/Authors.jsx';
import CreatePost from './pages/CreatePost.jsx';
import EditPost from './pages/EditPost.jsx';
import CategoryPosts from './pages/CategoryPosts.jsx';
import AuthorPost from './pages/AuthorPost.jsx';
import Dashbord from './pages/Dashbord.jsx';
import Logout from './pages/Logout.jsx';

import PrivateRoute from './components/PrivateRoute.jsx';
import PublicOnlyRoute from './components/PublicOnlyRoute.jsx';

import AuthProvider from './context/AuthContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <PostDetail /> },

      {
        path: "register",
        element: (
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        ),
      },

      {
        path: "login",
        element: (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        ),
      },

      {
        path: "profile/:id",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },

      { path: "authors", element: <Authors /> },

      {
        path: "create",
        element: (
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        ),
      },

      { path: "posts/categories/:category", element: <CategoryPosts /> },

      { path: "posts/users/:id", element: <AuthorPost /> },

      {
        path: "myposts/:id",
        element: (
          <PrivateRoute>
            <Dashbord />
          </PrivateRoute>
        ),
      },

      {
        path: "posts/:id/edit",
        element: (
          <PrivateRoute>
            <EditPost />
          </PrivateRoute>
        ),
      },

      { path: "logout", element: <Logout /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
