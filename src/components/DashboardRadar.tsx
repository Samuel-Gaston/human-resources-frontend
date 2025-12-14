import { useEffect, useState } from "react";
import axios from "axios";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Treemap
} from "recharts";

type Stats = {
  users: number;
  sites: number;
  department: number;
  position: number;
  salary: number;
  personnel: number;
  fine: number;
  fineType: number;
  leave: number;
  leaveType: number;
  cnps: number;
  contract: number;
  contractType: number;
};

const DashboardRadar = () => {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    sites: 0,
    department: 0,
    position: 0,
    salary: 0,
    personnel: 0,
    fine: 0,
    fineType: 0,
    leave: 0,
    leaveType: 0,
    cnps: 0,
    contract: 0,
    contractType: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/dashboard/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats");
      }
    };

    fetchStats();
  }, []);

  const radialData = [
    { name: "Users", value: stats.users, fill: "red" },
    { name: "Sites", value: stats.sites, fill: "blue" },
    { name: "Departments", value: stats.department, fill: "green" },
    { name: "Positions", value: stats.position, fill: "orangered" },
    { name: "Salaries", value: stats.salary, fill: "yellow" },
    { name: "Personnel", value: stats.personnel, fill: "limegreen" },
    { name: "Fines", value: stats.fine, fill: "coral" },
    { name: "FineTypes", value: stats.fineType, fill: "darkblue" },
    { name: "Leaves", value: stats.leave, fill: "gray" },
    { name: "LeaveTypes", value: stats.leaveType, fill: "white" },
    { name: "CNPS", value: stats.cnps, fill: "skyblue" },
    { name: "Contracts", value: stats.contract, fill: "orange" },
    { name: "ContractTypes", value: stats.contractType, fill: "pink" }
  ];

  const treemapData = radialData.map(d => ({
    name: d.name,
    value: d.value
  }));

  return (
    <div className="bg-gray-900 min-h-screen p-6 space-y-10">



      <div className="bg-gray-950 rounded-xl p-6 shadow">
        <h2 className="text-center text-xl font-semibold mb-4 text-white">
          HRM Modules – Radial Overview
        </h2>

        <ResponsiveContainer width="100%" height={450}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            barSize={12}
            data={radialData}
          >
            <RadialBar
              dataKey="value"
          
              background
         
            />
            <Tooltip />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* TREEMAP */}
      <div className="bg-gray-950 rounded-xl p-6 shadow">
        <h2 className="text-center text-xl font-semibold text-black mb-4">
          HRM Modules – Proportional View
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <Treemap
            data={treemapData}
            dataKey="value"
            nameKey="name"
            stroke="#111827"
            fill="orange"
       >
            <Tooltip />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardRadar;
