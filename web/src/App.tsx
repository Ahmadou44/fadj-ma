import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Pharmacy Portal Routes */}
                <Route path="/dashboard/*" element={<Dashboard />} />

                {/* Admin Portal Routes */}
                <Route path="/admin/*" element={<AdminDashboard />} />

                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
            <Toaster position="top-right" />
        </BrowserRouter>
    );
}

export default App;
