import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import CollectionDetail from './pages/CollectionDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/:collectionId" element={<CollectionDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
