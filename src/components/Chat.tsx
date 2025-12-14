"use client"
import {  Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
type Job = {
  id:number;
  name:string;
  number:number;
}
const data:Job[] = [
  {id:1, name: "Software Developer", number: 40 },
  {id:2,  name: "Accountancy", number: 30 },
  {id:3, name: "Marketer", number: 20 },
  {id:4, name: "HR Manager", number: 10 },
    {id:3, name: "Marketer", number: 20 },
     {id:2,  name: "Accountancy", number: 30 },
      {id:2,  name: "Accountancy", number: 30 },
      {id:3, name: "Marketer", number: 20 },
  {id:3, name: "Marketer", number: 20 },
 {id:1, name: "Software Developer", number: 40 },
 
]

const COLORS = ["#32CD32", "#FFD700", "#FF8C00", "#00CED1"]

export default function DashboardCharts() {
  return (
    <div style={{marginTop:70}} className="Chart grid grid-cols-1 md:grid-cols-1 gap-8 p-6  rounded-2xl w-full max-w-5xl mx-auto">
      
      <div className=" p-4 rounded-xl bg-gray-950" style={{boxShadow:'0 0 30px'}}>
        <h2 className="text-center font-semibold text-gray-200 mb-4">
          Inventory Number
        </h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="number" fill="orange" barSize={50} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}
