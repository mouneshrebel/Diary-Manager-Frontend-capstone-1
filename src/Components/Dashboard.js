
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../Context/Url";
import Dropdown from "react-bootstrap/Dropdown";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import DonutChart from "./ProjectChart";


function Dashboard() {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();

  const handleEdit = ({ title, URL, description, id }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("title", title);
    localStorage.setItem("URL", URL);
    localStorage.setItem("description", description);
    navigate("/editProjects");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        callApi(); // Fetch data again after deleting a project
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const handleCreateProject = () => {
    navigate("/addProject");
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      callApi(); // Fetch data again after updating status
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleOpen = (project) => {
    navigate("/projectdetails", { state: { project } });
  };

  const getStatusColor = (status) => {
    if (status && typeof status === "string") {
      switch (status.toLowerCase()) {
        case "done":
          return "rgb(159, 236, 182)";
        case "backlog":
          return "rgb(236, 159, 174)";
        case "in progress":
          return "rgb(116, 221, 250)";
        case "todo":
          return "white";
        default:
          return "white"; // Default color
      }
    }
    return "white"; // Default color if status is undefined or not a string
  };

  const getProgressBarVariant = (status) => {
    if (status && typeof status === "string") {
      switch (status.toLowerCase()) {
        case "done":
          return "success";
        case "backlog":
          return "danger";
        case "in progress":
          return "info";
        default:
          return "secondary";
      }
    }
    return "secondary"; // Default variant if status is undefined or not a string
  };

  const callApi = async () => {
    try {
      const res = await axios.get(API_URL);
      setApiData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //chart

  const getStatusCounts = () => {
    const statusCounts = {
      done: 0,
      backlog: 0,
      inProgress: 0,
      todo: 0,
    };

    apiData.forEach((project) => {
      // Make sure project.status is defined before using toLowerCase
      if (project.status && typeof project.status === 'string') {
        switch (project.status.toLowerCase()) {
          case 'done':
            statusCounts.done++;
            break;
          case 'backlog':
            statusCounts.backlog++;
            break;
          case 'in progress':
            statusCounts.inProgress++;
            break;
          case 'todo':
            statusCounts.todo++;
            break;
          default:
            break;
        }
      }
    });

    return statusCounts;
  };

  const getChartData = () => {
    const statusCounts = getStatusCounts();

    return {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: [
            'rgba(159, 236, 182)', // done
            'rgba(236, 159, 174)', // backlog
            'rgba(116, 221, 250)', // in progress
            'rgba(255, 255, 255, 0.5)', // todo
          ],
          borderColor: [
            'rgba(159, 236, 182, 1)',
            'rgba(236, 159, 174, 1)',
            'rgba(116, 221, 250, 1)',
            'rgba(255, 255, 295, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  useEffect(() => {
    callApi();
  }, []); // Fetch data when the component mounts

  return (
    <>
      <div className="dashboard-page">
      
        

        <div className="dashboard-container">
          <div className="for-chart">
          <div className="create-button">
          <button
            className="btn btn-info"
            onClick={handleCreateProject}
            style={{ margin: "10px" }}
          >
            <i class="fa-solid fa-plus"></i>&nbsp; Create
          </button>
        </div>
        <DonutChart data={getChartData()} />
        </div>
          <div className="all-of-code">
            {apiData.map((project) => (
              <div key={project.id}>
                <div
                  style={{
                    width: "300px",
                    height: "500px",
                    // borderTopRightRadius: "75px",
                    borderRadius: "10px",
                    backgroundColor: getStatusColor(project.status),
                    color: getStatusColor(project.status),
                  }}
                >
                  <div className="card-components">
                    <div className="inside-content">
                      <div className="heading">Title</div>
                      <div className="project-contents">{project.title}</div>
                      <div className="heading">Project URL</div>
                      <div className="project-contents">{project.URL}</div>
                      <div className="heading">Description</div>
                      <div className="project-contents">
                        {project.description}
                      </div>
                    </div>

                    <div className="status">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                        >
                          Status: {project.status}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              handleStatusChange(project.id, "backlog")
                            }
                          >
                            backlog
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleStatusChange(project.id, "in progress")
                            }
                          >
                            In Progress
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleStatusChange(project.id, "done")
                            }
                          >
                            Done
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              handleStatusChange(project.id, "todo")
                            }
                          >
                            Todo
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="progress-bar">
                      <ProgressBar
                        now={
                          project.status === "done"
                            ? 100
                            : project.status === "in progress"
                            ? 50
                            : 101
                        }
                        variant={getProgressBarVariant(project.status)}
                        label={`Progress: ${project.status}`}
                        style={{
                          width: "100%",
                          height: "40px",
                          borderColor: "1px solid white",
                        }}
                      />
                    </div>
                  </div>

                  <div className="card-buttons">
                    <button
                      className="for-action"
                      id="for-Edit"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="for-action"
                      id="for-Delete"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="for-action"
                      id="for-Open"
                      onClick={() => handleOpen(project)}
                    >
                      Open
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* ----------------------------- */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
