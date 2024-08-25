import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/home';
import Layout from './components/layout/layout';
import Categories from './Pages/categories/categories';
import Register from './Pages/login/logins'; // Correct default import
import Result from './Pages/result/result';
import SignIn from './components/signIn/signIn';
import Sequence from './Pages/sequence/sequence';
import Profile from './Pages/profile/profile';
import SavedPoses from './Pages/saved/savedPoses'; // Correct import name
import Generate from './Pages/Generate/generate';
import About from './Pages/about/about';
import { AuthProvider } from './contexts/AuthContext';
import YogaPoseDetails from './Pages/yogaPosesDetails/detailsPage.jsx'; // Add this import
import AllGeneratedVideos from './Pages/AllGeneratedVideos/AllGeneratedVideos'; // Import for the new component
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/generate"
            element={
              <Layout>
                <Generate />
              </Layout>
            }
          />
          <Route
            path="/categories"
            element={
              <Layout>
                <Categories />
              </Layout>
            }
          />
          {/* Change logins to login to match the navigation */}
          <Route
            path="/login"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/SignIn"
            element={
              <Layout>
                <SignIn />
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <Result />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/sequence"
            element={
              <Layout>
                <Sequence />
              </Layout>
            }
          />
          <Route
            path="/save"
            element={
              <Layout>
                <SavedPoses />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/pose/:name"
            element={
              <Layout>
                <YogaPoseDetails />
              </Layout>
            }
          />
          <Route
            path="/all-generated-videos"
            element={
              <Layout>
                <AllGeneratedVideos />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
