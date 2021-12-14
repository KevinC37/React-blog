import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './storage/store.js';

import { QueryClient, QueryClientProvider } from "react-query";

import Navigation from './Views/Components/Navigation/Navigation.jsx';
import Blogposts from './Views/Components/Home/Blogposts.jsx';
import AboutPage from './Views/Pages/About';
import ContactPage from './Views/Pages/Contactus';
import NotFound from './Views/Pages/404';
import Blogpost from './Views/Pages/Blogposts';
import LogIn from './Views/Components/Auth/LogIn';
import SignUp from './Views/Components/Auth/SignUp'
import AddPost from './Views/Pages/AddPost.jsx';

import reportWebVitals from './reportWebVitals';


const queryClient = new QueryClient();


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route exact path="/" element={<Blogposts />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/contact" element={<ContactPage />} />
            <Route path="/posts/:slug" element={<Blogpost />} />
            <Route path="/add-post" element={<AddPost />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
