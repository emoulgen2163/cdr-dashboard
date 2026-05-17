import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"


function CallsByCity({calls}) {
    const cityData = Object.entries(
        calls.reduce( (acc, call) => {
            acc[call.city] = (acc[call.city] || 0) + 1
            return acc
        }, {})
    ).map(([city, count]) => ({ city, count: count }))
    .slice(0, 10)

    return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-white">Total Calls by City</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={cityData} dataKey="count" nameKey = "city" label={({ name, value }) => `${name}: ${value}`}/>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default CallsByCity
