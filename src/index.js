import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Views/Partials/Navigation';
import Blogposts from './Views/Partials/Blogposts';
import reportWebVitals from './reportWebVitals';
import AboutPage from './Views/Pages/About';
import ContactPage from './Views/Pages/Contactus';
import NotFound from './Views/Pages/404';
import Blogpost from './Views/Pages/Blogpost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from './Views/auth/components/LogIn';
import SignUp from './Views/auth/components/SignUp'
// import {
//   TransitionGroup,
//   CSSTransition
// } from "react-transition-group";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
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

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
