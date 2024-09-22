import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password
            });
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.error || "Erro ao cadastrar");
        }
    }
    return (
        <div>
            <h1>Registrar</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="username">Nome:</label>
                    <input
                        type="text"
                        id="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                <button type="submit">Cadastar</button>
            </form>
        </div>
    )
}

export default Register;