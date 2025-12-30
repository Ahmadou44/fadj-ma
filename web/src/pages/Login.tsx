import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ phone: '', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.ok) {
                // Store user/token in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                alert(data.error || "Login failed");
            }
        } catch (err) {
            console.error(err);
            alert("Login failed (Is server running?)");
        }
    };

    return (
        <div className="min-h-screen bg-medical-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-medical-100 p-3 rounded-full">
                        <Pill className="w-8 h-8 text-medical-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Fadj Ma Pro</h2>
                <p className="text-center text-gray-500 mb-8">Access your pharmacy dashboard</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                            placeholder="+221 77 000 00 00"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="w-full bg-medical-600 text-white py-2 rounded-lg font-semibold hover:bg-medical-700 transition">
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    New pharmacy? <a href="/register" className="text-medical-600 font-medium hover:underline">Register here</a>
                </p>
            </div>
        </div>
    );
}
