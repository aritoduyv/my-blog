import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LatestPostsPage from './pages/LatestPostsPage';
import CategoryPage from './pages/CategoryPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/latest" element={<LatestPostsPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/post/:postSlug" element={<PostDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;