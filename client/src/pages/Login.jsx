import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.error || "Erro ao efetur login");
        }
    }

    return (
        <div>
            <h1>Registrar</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="username">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;