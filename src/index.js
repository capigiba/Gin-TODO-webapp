import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <HomePage />},
      // {
      //   path: "/movies",
      //   element: <Movies />,
      // },
      // {
      //   path: "/movies/:id",
      //   element: <Movie />,
      // },
      // {
      //   path: "/genres",
      //   element: <Genres />,
      // },
      // {
      //   path: "/genres/:id",
      //   element: <OneGenre/>
      // },
      // {
      //   path: "/admin/movie/0",
      //   element: <EditMovie />,
      // },
      // {
      //   path: "/admin/movie/:id",
      //   element: <EditMovie />,
      // },
      // {
      //   path: "/manage-catalogue",
      //   element: <ManageCatalogue />,
      // },
      // {
      //   path: "/graphql",
      //   element: <GraphQL />,
      // },
      {
        path: "/login",
        element: <Login />,
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

