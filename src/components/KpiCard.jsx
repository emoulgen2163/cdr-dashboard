import { Card, CardContent } from "@/components/ui/card"

function KpiCard({ title, value, color = "text-white" }) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <p className="text-sm text-gray-500">{title}</p>
        <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
      </CardContent>
    </Card>
  )
}

export default KpiCard