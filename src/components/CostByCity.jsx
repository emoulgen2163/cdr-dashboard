import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

function CostByCity({ calls }) {
  const cityData = Object.entries(
    calls.reduce((acc, call) => {
      acc[call.city] = (acc[call.city] || 0) + parseFloat(call.callCost)
      return acc
    }, {})
  )
    .map(([city, cost]) => ({ city, cost: parseFloat(cost.toFixed(2)) }))
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 8)

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-white">Total Cost by City</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cityData}>
            <XAxis dataKey="city" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fill: '#9ca3af' }}/>
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="cost" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default CostByCity