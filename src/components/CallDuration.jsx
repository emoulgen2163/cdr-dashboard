import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

function CallDuration({ calls }) {
    const callData = Object.entries(
        calls.reduce( (acc, call) => {
            acc[call.callerName] = call.callDuration
            return acc
            }, {}
        )
    ).map( ([name, duration]) => ({ name, duration: duration }) )
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10)

    return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-white">Top 10 Callers with Longest Calls</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={callData}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis tick={{ fill: '#9ca3af' }}/>
            <Tooltip formatter={(value) => `${value}s`} />
            <Bar dataKey="duration" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default CallDuration