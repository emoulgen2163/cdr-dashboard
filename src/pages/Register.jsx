import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Register() {

    const [username, setUsername] = useState("")
    const [fullname, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleRegister = async() => {
        const response = await fetch("https://cdr-backend-50vy.onrender.com/api/auth/register", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, fullName: fullname, email, password, role })
            }
        )

        if (!response.ok) {
            setError("Invalid password")
            return
        }
        navigate("/")
    }
    

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h1 className="text-white text-2xl font-bold mb-6">Register</h1>
        <div className="flex flex-col gap-4">

            <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            />

            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            />

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
            <p className="text-white">Role: </p>
            
            <ul className="flex flex-col gap-2">
                <li className="text-white flex items-center gap-2">
                    <input type="radio" name="role" value="admin"  onChange={ () => setRole("admin")}/>Admin
                    </li>
                <li className="text-white flex items-center gap-2">
                    <input type="radio" name="role" value="analyst" onChange={ () => setRole("analyst")} />Analyst
                    </li>
            </ul>

            <button className="bg-indigo-500 text-white p-3 rounded-lg font-semibold" onClick={ () => handleRegister()}>
            Register
            </button>

            <p className="text-gray-400 text-sm text-center">
            Already have an account? 
            <span onClick={() => navigate("/login")} className="text-indigo-400 cursor-pointer"> Login </span>
            </p>

            {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
        </div>
    </div>
) 


    
}

export default Register