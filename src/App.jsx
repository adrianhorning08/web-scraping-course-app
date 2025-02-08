import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Course from './pages/Course';
import Login from './pages/Login';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course" element={<Course />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;