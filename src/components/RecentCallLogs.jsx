import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { useState } from "react"

function RecentCallLogs({calls}) {
    
    const [currentPage, setCurrentPage] = useState(0)
    const rowsPerPage = 100
    const startIndex = currentPage * rowsPerPage
    const visibleCalls = calls.slice(startIndex, startIndex + rowsPerPage)
    const totalPages = Math.ceil(calls.length / rowsPerPage)

    return(
        <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-white">Recent Call Logs</h2>
                <Table className="text-lg mb-4 text-white">
                     <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Caller Name</TableHead>
                        <TableHead>Caller Number</TableHead>
                        <TableHead>Receiver Number</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            visibleCalls.map( (call) =>
                                (
                                    <TableRow key={call.id}>
                                        <TableCell>{call.callerName}</TableCell>
                                        <TableCell>{call.callerNumber}</TableCell>
                                        <TableCell>{call.receiverNumber}</TableCell>
                                        <TableCell>{call.city}</TableCell>
                                        <TableCell>{ new Date(call.callStartTime).toLocaleString() }</TableCell>
                                        <TableCell>{call.callDuration}s</TableCell>
                                        <TableCell className="text-right">${parseFloat(call.callCost).toFixed(2)}</TableCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                </Table>
                
                <br />

                <div className="flex flex-wrap items-center justify-center gap-2 md:flex-row mb-4 text-white">
                    <Button variant="outline" size="icon" aria-label="Submit" disabled = {currentPage == 0} onClick = {() => setCurrentPage(currentPage - 1)} >
                        <ArrowLeftIcon variant="outline"/>
                    </Button>
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <Button variant="outline" size="icon" aria-label="Submit" disabled = {currentPage == totalPages - 1}  onClick = {() => setCurrentPage(currentPage + 1)}>
                        <ArrowRightIcon variant="outline"/>
                    </Button>
                </div>
            </CardContent>
        </Card>
        
    )
    
}

export default RecentCallLogs
