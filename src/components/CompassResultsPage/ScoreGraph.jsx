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

const ScoreGraph = (props) => {
  const { data } = props;

  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey="voter_name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar barSize={10} dataKey="תוצאות" fill={palette.brand} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreGraph;
