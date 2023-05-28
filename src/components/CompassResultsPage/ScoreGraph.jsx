import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { palette } from "../../assets/colorsPalette";

const data = [
    { name: "Page A", "ציון חבר הכנסת": -30 },
    { name: "Page B", "ציון חבר הכנסת": 50 },
    { name: "Page C", "ציון חבר הכנסת": 80 },
    { name: "Page D", "ציון חבר הכנסת": -10 },
    { name: "Page E", "ציון חבר הכנסת": 90 },
    { name: "Page F", "ציון חבר הכנסת": -60 },
    { name: "Page G", "ציון חבר הכנסת": 70 },
    { name: "Page H", "ציון חבר הכנסת": 20 },
    { name: "Page I", "ציון חבר הכנסת": -40 },
    { name: "Page J", "ציון חבר הכנסת": -80 },
    { name: "Page K", "ציון חבר הכנסת": 10 },
    { name: "Page L", "ציון חבר הכנסת": -50 },
    { name: "Page M", "ציון חבר הכנסת": -20 },
    { name: "Page N", "ציון חבר הכנסת": 40 },
    { name: "Page O", "ציון חבר הכנסת": 60 },
    { name: "Page P", "ציון חבר הכנסת": -70 },
    { name: "Page Q", "ציון חבר הכנסת": 30 },
    { name: "Page R", "ציון חבר הכנסת": -90 },
    { name: "Page S", "ציון חבר הכנסת": -100 },
    { name: "Page T", "ציון חבר הכנסת": 100 },
    { name: "Page U", "ציון חבר הכנסת": -5 },
    { name: "Page V", "ציון חבר הכנסת": 75 },
    { name: "Page W", "ציון חבר הכנסת": -15 },
    { name: "Page X", "ציון חבר הכנסת": 85 },
    { name: "Page Y", "ציון חבר הכנסת": -35 },
    { name: "Page Z", "ציון חבר הכנסת": 55 },
    { name: "Page AA", "ציון חבר הכנסת": -85 },
    { name: "Page AB", "ציון חבר הכנסת": 45 },
    { name: "Page AC", "ציון חבר הכנסת": 95 },
    { name: "Page AD", "ציון חבר הכנסת": -25 },
    { name: "Page AE", "ציון חבר הכנסת": 65 },
    { name: "Page AF", "ציון חבר הכנסת": -45 },
    { name: "Page AG", "ציון חבר הכנסת": -75 },
    { name: "Page AH", "ציון חבר הכנסת": 25 },
    { name: "Page AI", "ציון חבר הכנסת": -15 },
    { name: "Page AJ", "ציון חבר הכנסת": -80 },
    { name: "Page AK", "ציון חבר הכנסת": 15 },
    { name: "Page AL", "ציון חבר הכנסת": -60 },
    { name: "Page AM", "ציון חבר הכנסת": -30 },
    { name: "Page AN", "ציון חבר הכנסת": 35 },
    { name: "Page AO", "ציון חבר הכנסת": 75 },
    { name: "Page AP", "ציון חבר הכנסת": -70 },
    { name: "Page AQ", "ציון חבר הכנסת": 40 },
    { name: "Page AR", "ציון חבר הכנסת": -90 },
    { name: "Page AS", "ציון חבר הכנסת": -100 },
    { name: "Page AT", "ציון חבר הכנסת": 100 },
    { name: "Page AU", "ציון חבר הכנסת": -5 },
    { name: "Page AV", "ציון חבר הכנסת": 75 }  
];

const ScoreGraph = () => {
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar barSize={10} dataKey="ציון חבר הכנסת" fill={palette.brand} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreGraph;
