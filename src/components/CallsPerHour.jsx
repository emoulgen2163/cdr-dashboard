import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

function CallsPerHour({calls}) {
    const hourData = Object.entries(
        calls.reduce( (acc, call) => {
                const hours = new Date(call.callStartTime).getHours()
                acc[hours] = 1 + (acc[hours] || 0)
                return acc
            }, {}     
        )
    ).map( ([hour, count]) => ( { hour, count }) )

    return(
        <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-white">Total Calls per Hour</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hourData}>
                        <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                        <YAxis tick={{ fill: '#9ca3af' }}/>
                        <Tooltip />
                        <Line dataKey="count" stroke="#6366f1"/>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
    
    
}

export default CallsPerHour