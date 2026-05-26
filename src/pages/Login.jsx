import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleLogin = async() => {
        const response = await fetch("https://cdr-backend-50vy.onrender.com/api/auth/login", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
        )

        if (!response.ok) {
            setError("Invalid password")
            return
        }

        const data = await response.json()
        localStorage.setItem("token", data.data)

        navigate("/dashboard")
    }
    

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h1 className="text-white text-2xl font-bold mb-6">Login</h1>
        <div className="flex flex-col gap-4">
            <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            />
            <button className="bg-indigo-500 text-white p-3 rounded-lg font-semibold" onClick={handleLogin}>
            Login
            </button>

            <p className="text-gray-400 text-sm text-center">
            Don't have an account? 
            <span onClick={() => navigate("/register")} className="text-indigo-400 cursor-pointer"> Register</span>
            </p>

            {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
        </div>
    </div>
) 


    
}

export default Login