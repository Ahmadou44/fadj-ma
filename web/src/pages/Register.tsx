import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-medical-50">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">Pharmacy Registration</h1>
                <p className="mb-4">Contact admin (support@fadjma.sn) to verify your license.</p>
                <Link to="/login" className="text-medical-600 hover:underline">Back to Login</Link>
            </div>
        </div>
    )
}
