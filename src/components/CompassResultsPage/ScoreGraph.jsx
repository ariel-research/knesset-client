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
import { useEffect } from "react";

const ScoreGraph = (props) => {
  const { data } = props;

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey="voter_name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Bar barSize={10} dataKey="graded" fill={palette.brand} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ScoreGraph;
