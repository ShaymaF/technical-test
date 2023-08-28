import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Bar } from "react-chartjs-2";

const Home = () => {
  const [availableUsers, setAvailableUsers] = useState();

  const [projectNames, setProjectNames] = useState([]);
  const [initialBudgets, setInitialBudgets] = useState([]);
  const [consumedBudgets, setConsumedBudgets] = useState([]);
  const [projectStatuses, setProjectStatuses] = useState([]); // Regular or Risked
  const [projects, setProjects] = useState([]);

  const [project_status, setProjectStatus] = useState([]); // Regular or Risked
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Extract project names, initial budgets, consumed budgets, and project statuses
    const names = (projects || [])?.map((project) => project.name);
    const initial = (projects || [])?.map((project) => project.budget_max_monthly);
    const consumed = (projects || [])?.map((project) => project.consumedBudget);
    const statuses = (projects || [])?.map((project) => (project.isRisked ? "Risked" : "Regular"));

    const active = (projects || [])?.filter((project) => project.status === "active");
    const inactive = (projects || [])?.filter((project) => project.status === "inactive");

    const dates = [];
    setProjectStatus({
      labels: ["Active Projects", "InActive Projects"],
      datasets: [
        {
          label: "Active Projects",
          backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 159, 64, 0.2)"],
          borderColor: ["rgb(54, 162, 235)", "rgb(255, 159, 64)"],
          borderWidth: 1,
          data: [(dates[1] = active?.length || 0), (dates[0] = inactive?.length || 0)],
        },
      ],
    });

    setProjectNames(names);
    setInitialBudgets(initial);
    setConsumedBudgets(consumed);
    setProjectStatuses(statuses);
  }, [projects]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/user");
      console.log("data", data);
      const activeUsers = (data || [])?.filter((user) => user.status === "active");
      const inactiveUsers = (data || [])?.filter((user) => user.status === "inactive");
      console.log("active", activeUsers?.length);
      console.log("inactive", inactiveUsers?.length);

      setUsers({
        labels: ["Active User", "InActive User"],
        datasets: [
          {
            label: "Active User",
            backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 159, 64, 0.2)"],
            borderColor: ["rgb(54, 162, 235)", "rgb(255, 159, 64)"],
            borderWidth: 1,
            data: [activeUsers?.length || 0, inactiveUsers?.length || 0],
          },
        ],
      });
    })();
  }, []);
  const line_options = {
    legend: {
      position: "bottom",
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "rgb(204, 204, 204)",
            borderDash: [3, 3],
          },
          ticks: {
            fontColor: "rgb(204, 204, 204)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgb(204, 204, 204)",
            borderDash: [3, 3],
          },
          ticks: {
            fontColor: "rgb(204, 204, 204)",
          },
        },
      ],
    },
  };
  // Define chart data
  const chartData = {
    labels: projectNames,
    datasets: [
      {
        label: "Initial Budget",
        data: initialBudgets,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Consumed Budget",
        data: consumedBudgets,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const fetchProjects = async () => {
    try {
      const { data: u } = await api.get("/project");
      setProjects(u);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  async function getUser() {
    const { data } = await api.get("/user/available");
    setAvailableUsers(data);
  }
  useEffect(() => {
    getUser();
    fetchProjects();
  }, []);

  return (
    <>
      <div className="px-2 md:!px-8 flex flex-col md:flex-row gap-5 mt-5">
        <div className="flex-1 mb-[10px]">
          <h2 className="text-[22px] font-semibold mb-4">Available</h2>
          {(availableUsers || [])?.map((user) => (
            <div key={user._id} className="bg-white mb-[10px] rounded-lg shadow-sm flex gap-4 p-3">
              <img src={user.avatar} alt="userlogo" className="rounded-full w-14 h-14" />
              <div>
                <h3 className="font-semibold text-lg mb-[3px]">{user.name}</h3>
                {/* <h3 className="text-[#676D7C] text-sm">{user.email}</h3> */}
                <h3 className="text-[#676D7C] text-sm">{user.job_title}</h3>
                <p className="text-[#676D7C] text-sm capitalize">{user.availability}</p>
              </div>
            </div>
          ))}
          {availableUsers?.length === 0 ? <span className="italic text-gray-600">No available users.</span> : null}
        </div>
      </div>
      <div className="px-2 md:!px-8  mt-5">
        <div className="flex-1 mb-[10px]">
          <div className="flex">
            <svg style={{ margin: "7px" }} width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 0C4.73478 0 4.48043 0.105357 4.29289 0.292893C4.10536 0.48043 4 0.734784 4 1C4 1.26522 4.10536 1.51957 4.29289 1.70711C4.48043 1.89464 4.73478 2 5 2H11C11.2652 2 11.5196 1.89464 11.7071 1.70711C11.8946 1.51957 12 1.26522 12 1C12 0.734784 11.8946 0.48043 11.7071 0.292893C11.5196 0.105357 11.2652 0 11 0H5ZM2 4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H13C13.2652 3 13.5196 3.10536 13.7071 3.29289C13.8946 3.48043 14 3.73478 14 4C14 4.26522 13.8946 4.51957 13.7071 4.70711C13.5196 4.89464 13.2652 5 13 5H3C2.73478 5 2.48043 4.89464 2.29289 4.70711C2.10536 4.51957 2 4.26522 2 4ZM0 8C0 7.46957 0.210714 6.96086 0.585786 6.58579C0.960859 6.21071 1.46957 6 2 6H14C14.5304 6 15.0391 6.21071 15.4142 6.58579C15.7893 6.96086 16 7.46957 16 8V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H2C1.46957 14 0.960859 13.7893 0.585786 13.4142C0.210714 13.0391 0 12.5304 0 12V8Z"></path>
            </svg>
            <h2 className="text-[22px] font-semibold mb-4">Project Financial Status</h2>
          </div>
          <div className="bg-white mb-[10px] rounded-lg shadow-sm  p-3">
            <div>
              <ul>
                {(projectNames || [])?.map((name, index) => (
                  <li key={index}>
                    <b>{name}:</b> <a className="text-[#676D7C] text-sm capitalize">{projectStatuses[index]}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
              <div className="bg-white mb-[10px] rounded-lg shadow-sm  p-3" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <Bar
                  data={chartData}
                  options={{
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex" style={{ justifyContent: "center" }}>
        <div className="mt-5 mb-5" style={{ width: "-webkit-fill-available" }}>
          <div className="bg-white mb-[10px] rounded-lg shadow-sm  p-3" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 className="text-[22px] font-semibold mb-4">Projects Status</h2>
            {project_status !== undefined && project_status?.datasets?.length ? <Bar data={project_status} options={line_options} /> : null}
          </div>
        </div>
        <div className="mt-5 mb-5" style={{ width: "-webkit-fill-available" }}>
          <div className="bg-white mb-[10px] rounded-lg shadow-sm  p-3" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 className="text-[22px] font-semibold mb-4">Users Status</h2>

            {users !== undefined && users?.datasets?.length ? <Bar data={users} options={line_options} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
