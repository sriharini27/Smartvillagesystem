import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ComplaintChart({ complaints }) {

  const issueCounts = {};

  complaints.forEach((c) => {
    issueCounts[c.issue_type] = (issueCounts[c.issue_type] || 0) + 1;
  });

  const data = {
    labels: Object.keys(issueCounts),
    datasets: [
      {
        label: "Complaint Types",
        data: Object.values(issueCounts),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4caf50",
          "#9966ff"
        ]
      }
    ]
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      <Pie data={data} />
    </div>
  );
}

export default ComplaintChart;