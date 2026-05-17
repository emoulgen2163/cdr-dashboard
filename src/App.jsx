import { useEffect, useState } from 'react'
import KpiCard from './components/KpiCard'
import CostByCity from './components/CostByCity'
import CallsByCity from './components/CallsByCity'
import CallsPerHour from './components/CallsPerHour'
import RecentCallLogs from './components/RecentCallLogs'
import CallDuration from './components/CallDuration'

function App() {

  const [calls, setCalls] = useState([])
  const [loading, setLoading] = useState(true)

  const url = "https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr"

  useEffect(
    () => {
      fetch(url).then(response => response.json()).then(
        data => {
        setCalls(data)
        setLoading(false)
      }
    )
    }, []
  )

  if (loading) {
    return <p>Loading...</p>
  }

  const totalCalls = calls.length

  const totalCost = calls.reduce( (sum, call) => sum + parseInt(call.callCost), 0)

  const avgDuration = Math.round(calls.reduce( (sum, call) =>
      sum + call.callDuration, 0
      )  / totalCalls
  )

  const successfulCalls = calls.filter( call =>
    call.callStatus === true
  ).length

  const failedCalls = calls.filter( call =>
    call.callStatus === false
  ).length



  return (
    <div className='p-8 bg-gray-950 min-h-screen'>
      
      <div className="bg-gray-900 text-white px-6 py-4 rounded-xl flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="bg-indigo-500 p-2 rounded-lg">
                📞
                </div>
                <span className="font-semibold text-lg">CDR Dashboard</span>
                <span className="text-gray-400 text-sm">Call Analytics</span>
            </div>
            <span className="text-gray-400 text-sm">{calls.length} records</span>
        </div>

      <p className="text-gray-400 text-sm mb-6">Showing all call data records · Last updated just now</p>

      <div className="grid grid-cols-5 gap-4">
        <KpiCard title="Total Calls" value={totalCalls} color="text-indigo-400" />
        <KpiCard title="Total Cost" value={`$${totalCost.toLocaleString()}`} color="text-white" />
        <KpiCard title="Average Duration" value={`${avgDuration}s`} color="text-white" />
        <KpiCard title="Successful Calls" value={successfulCalls} color="text-green-400" />
        <KpiCard title="Failed Calls" value={failedCalls} color="text-red-400" />
      </div>

      <div className="mt-6">
        <CallDuration calls={ calls } />
      </div>
      <br />

      <div className="grid grid-cols-2 gap-6">
        <CostByCity calls={calls} />
        <CallsByCity calls={calls} />
      </div>

      <div className="mt-6">
        <CallsPerHour calls = {calls}/>
      </div>

      <div className="mt-6">
        <RecentCallLogs calls={calls} />
      </div>
    </div>
  )
}

export default App
