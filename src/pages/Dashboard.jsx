import { useEffect, useState } from 'react'
import KpiCard from '../components/KpiCard'
import CostByCity from '../components/CostByCity'
import CallsByCity from '../components/CallsByCity'
import CallsPerHour from '../components/CallsPerHour'
import RecentCallLogs from '../components/RecentCallLogs'
import CallDuration from '../components/CallDuration'
import { data, useNavigate } from "react-router-dom"

function Dashboard() {
    const [calls, setCalls] = useState([])
    const [filteredCalls, setFilteredCalls] = useState([])
    const [totalCalls, setTotalCalls] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [avgDuration, setAvgDuration] = useState(0)
    const [successfulCalls, setSuccessful] = useState(0)
    const [failedCalls, setFailed] = useState(0)
    const [loading, setLoading] = useState(true)

    const [cityFilter, setCityFilter] = useState("")
    const [callerFilter, setCallerFilter] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const navigate = useNavigate()

    const baseUrl = "https://cdr-backend-50vy.onrender.com/api/cdr"
    const token = localStorage.getItem("token")
    if (!token) {
        navigate("/")
    }
    const payload = token ? JSON.parse(atob(token.split(".")[1])) : {}
    const fullName = payload.fullName

    const fetchWithAuth = (url) => {

        if (!token) {
            navigate("/")
        }

        return fetch(url,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(response => response.json())
    }

    const fetchCalls = () => {
        var url = `${baseUrl}?limit=1000`

        if (cityFilter) {
            url += `&city=${cityFilter}`
        }

        if (callerFilter) {
            url += `&callerNumber=${callerFilter}`
        }

        if (startDate) {
            url += `&startDate=${startDate}`
        }

        if (endDate) {
            url += `&endDate=${endDate}`
        }

        fetchWithAuth(url).then(data =>
            setFilteredCalls(data.data)
        )
    }



    useEffect(
        () => {

            fetchWithAuth(`${baseUrl}?limit=1000`).then(
                data => {
                    setCalls(data.data)
                    setFilteredCalls(data.data)
                }
            )

            fetchWithAuth(`${baseUrl}/analytics/total-calls`).then(
                data => {
                    setTotalCalls(data.totalCalls)
                }
            )

            fetchWithAuth(`${baseUrl}/analytics/total-cost`).then(
                data => {
                    const cost = parseInt(data.totalCost)
                    setTotalCost(cost)
                }
            )

            fetchWithAuth(`${baseUrl}/analytics/avg-duration`).then(
                data => {
                    const duration = parseInt(data.averageDuration)
                    setAvgDuration(duration)
                }
            )

            fetchWithAuth(`${baseUrl}/analytics/call-status`).then(
                data => {
                    setSuccessful(data.successful)
                    setFailed(data.failed)
                    setLoading(false)

                }
            )




        }, []
    )

    if (loading) {
        return <p>Loading...</p>
    }


    return (

        <div className='p-8 bg-gray-950 min-h-screen'>

            <div className="bg-gray-900 text-white px-6 py-4 rounded-xl flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-500 p-2 rounded-lg">
                        📞
                    </div>
                    <span className="font-semibold text-lg">Welcome {fullName}</span>
                    <span className="text-gray-400 text-sm">Call Analytics</span>
                </div>
                <span className="text-gray-400 text-sm">{totalCalls} records</span>
                {payload.role === "admin" && (
                    <span onClick={() => navigate("/users")} className="text-gray-400 text-sm cursor-pointer hover:text-white">
                        User List
                    </span>

                )
                }


                <button
                    onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/login")
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
                >
                    Logout
                </button>
            </div>

            <p className="text-gray-400 text-sm mb-6">Showing all call data records · Last updated just now</p>

            <div className="grid grid-cols-5 gap-4">
                <KpiCard title="Total Calls" value={totalCalls} color="text-indigo-400" />
                {payload.role === "admin" && (<KpiCard title="Total Cost" value={parseInt(totalCost).toLocaleString()} color="text-white" />)}
                <KpiCard title="Average Duration" value={`${avgDuration}s`} color="text-white" />
                <KpiCard title="Successful Calls" value={successfulCalls} color="text-green-400" />
                <KpiCard title="Failed Calls" value={failedCalls} color="text-red-400" />
            </div>

            <div className="mt-6">
                <CallDuration calls={calls} />
            </div>
            <br />

            <div className="grid grid-cols-2 gap-6">
                {payload.role === "admin" && (<CostByCity calls={calls} />)}
                <CallsByCity calls={calls} />
            </div>

            <div className="mt-6">
                <CallsPerHour calls={calls} />
            </div>

            <div className="mt-6 bg-gray-900 p-4 rounded-xl flex gap-4 flex-wrap">
                <input
                    type="text"
                    placeholder="Filter by city"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
                <input
                    type="text"
                    placeholder="Filter by caller number"
                    value={callerFilter}
                    onChange={(e) => setCallerFilter(e.target.value)}
                    className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                />
                <button
                    onClick={fetchCalls}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
                >
                    Search
                </button>
            </div>


            <div className="mt-6">
                <RecentCallLogs calls={filteredCalls} />
            </div>
        </div>
    )
}

export default Dashboard