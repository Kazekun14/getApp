import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page — loads when visiting "/" */}
        <Route path="/" element={<Index />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        {/* Add more pages here as you create them */}
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;