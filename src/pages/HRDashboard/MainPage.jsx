import Layout from "../../components/Layout.jsx";

import SevereCases from "./SevereCases";
import Correlations from "./Correlations";
import { Smile, ArrowDownRight, ChartNoAxesCombined, Brain } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const weeklyData = [
  { day: "Mon", score: 6.5 },
  { day: "Tue", score: 7.0 },
  { day: "Wed", score: 7.2 },
  { day: "Thu", score: 7.5 },
  { day: "Fri", score: 7.8 },
  { day: "Sat", score: 7.4 },
  { day: "Sun", score: 7.1 },
];

const moodData = [
  { name: "Happy", value: 40, color: "#34D399" },
  { name: "Sad", value: 15, color: "#F87171" },
  { name: "Frustrated", value: 10, color: "#FBBF24" },
  { name: "Okay", value: 25, color: "#60A5FA" },
  { name: "Excited", value: 10, color: "#A78BFA" },
];

const MainPage = () => {
  return (
    <Layout>
      <div className="relative bg-gray-50 dark:bg-gray-900 min-h-screen pb-4">
        {/*<HRNavbar />*/}

        <div className="py-6 px-6 md:px-10">
          <div className="mb-8 animate-fade-in">
            <h1 className="page-header mb-2 text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Monitor employee well-being and engagement across the organization
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Overall Wellness Score", value: "7.2/10", sign:<Smile className="text-green-400"/> },
              { title: "Critical Cases", value: "5", sign:<ArrowDownRight className="text-red-600"/> },
              { title: "Total Employees Surveyed", value: "300", sign:<ChartNoAxesCombined className="text-green-400"/> },
              { title: "Overall Mood", value: "Frustated", sign:<Brain className="text-green-400"/> },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-center
              items-center text-center w-full min-h-[150px] border border-gray-100 dark:border-gray-700"
              >
                <div className={`h-10 w-10 rounded-sm ${(item.title === "Critical Cases") ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'} flex justify-center items-center`}>
                  {item.sign}
                </div>
                <p className="text-gray-400 dark:text-gray-300 font-semibold text-lg">{item.title}</p>
                <p className="text-3xl font-bold text-black dark:text-white mt-2">{item.value}</p>
              </div>
            ))}
          </div>


          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">

            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">Weekly Wellness Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <XAxis dataKey="day" stroke="#90EE90" />
                  <YAxis domain={[6, 8]} stroke="#90EE90" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', border: 'none' }} />
                  <Line type="monotone" dataKey="score" stroke="#03C03C" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">Mood Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={moodData} cx="50%" cy="50%" innerRadius={50} outerRadius={100} dataKey="value">
                    {moodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend formatter={(value) => <span className="text-gray-800 dark:text-gray-200">{value}</span>} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <Correlations />
        <SevereCases />
      </div>
    </Layout>
  );
};

export default MainPage;
