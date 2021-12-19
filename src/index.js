import React from 'react';
import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './storage/store.js';
import { PersistGate } from 'redux-persist/integration/react';


import { QueryClient, QueryClientProvider } from "react-query";

import Navigation from './views/components/navigation/Navigation.jsx';
import NotFound from './views/pages/404';

import reportWebVitals from './reportWebVitals';


const SignUp = lazy(() => import('./views/components/auth/SignUp'));
const LogIn = lazy(() => import('./views/components/auth/LogIn'));

const Blogposts = lazy(() => import('./views/pages/HomePage.jsx'))
const Blogpost = lazy(() => import('./views/pages/Blogpost'));
const AddPost = lazy(() => import('./views/pages/AddPost.jsx'))

const ContactPage = lazy(() => import('./views/pages/Contactus'));
const AboutPage = lazy(() => import('./views/pages/About'));



const queryClient = new QueryClient({
  defaultOptions: {

    queries: {
      refetchOnWindowFocus: false,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },

  },
});


ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<span>Loading...</span>}>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
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
          </PersistGate>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  </Provider>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
