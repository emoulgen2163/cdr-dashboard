import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"


function UserList(){

    const baseUrl = "https://cdr-backend-50vy.onrender.com/api/auth"
    const token = localStorage.getItem("token")
    const payload = token ? JSON.parse(atob(token.split(".")[1])) : {}
    const fullName = payload.fullName

    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchWithAuth = (url) =>{
            
        return fetch(url,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(response => { 
            if (response.status === 401 || response.status === 500) {
                localStorage.removeItem("token")
                navigate("/")
            }
            
            return response.json() 
            }
        )
    }

    useEffect(
        () => {
            fetchWithAuth(`${baseUrl}/users`).then(
                data => {
                    console.log(data);
                    
                    setUsers(data.users || [])
                    setLoading(false)
                }
            )
        }, []
    )

    if (loading) return <p className="text-white p-8">Loading...</p>

    return(

        <div className='p-8 bg-gray-950 min-h-screen'>
            <div className="bg-gray-900 text-white px-6 py-4 rounded-xl flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-500 p-2 rounded-lg">
                    📞
                    </div>
                    <span className="font-semibold text-lg">Welcome {fullName}</span>
                    <span className="text-gray-400 text-sm">Call Analytics</span>
                </div>
                <span onClick={() => navigate("/")} className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        Back
                </span>
                <button 
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/")
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                        >
                        Logout
                </button>
            </div>
            <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">Users</h2>
                    <Table className="text-lg mb-4 text-white">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Full Name</TableHead>
                                <TableHead>User Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {
                                users.map( (user) =>
                                    (
                                        <TableRow key={user._id}>
                                            <TableCell>{user.fullName}</TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                        </TableRow>
                                    )
                                )
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        
    )

}

export default UserList