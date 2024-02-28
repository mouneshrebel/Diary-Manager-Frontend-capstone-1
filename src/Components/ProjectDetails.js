

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProject } from "../Context/ProjectContext";

function ProjectDetails() {
  const { state } = useLocation();
  const { project, setProject } = useProject();
  const navigate = useNavigate();

  useEffect(() => {
    const savedProject = getSavedProject();
    setProject({
      title: "",
      description: "",
      status: "",
      task: "",
      tasks: getSavedTasks(savedProject.id) || [],
      ...savedProject,
    });
  }, [setProject]);

  useEffect(() => {
    if (state && state.project) {
      setProject({
        ...state.project,
        task: "",
        tasks: getSavedTasks(state.project.id) || [],
      });
    }
  }, [state, setProject]);

  useEffect(() => {
    saveProjectToLocalStorage(project);
  }, [project]);

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = getSavedTasks(project.id) || [];
    setProject((prevProject) => ({ ...prevProject, tasks: savedTasks }));
  }, [project, setProject]);

  const getSavedProject = () => {
    try {
      const savedProjectJSON = localStorage.getItem("project");
      return savedProjectJSON ? JSON.parse(savedProjectJSON) : {};
    } catch (error) {
      console.error("Error parsing saved project JSON:", error);
      return {};
    }
  };

  const saveProjectToLocalStorage = (projectData) => {
    try {
      localStorage.setItem("project", JSON.stringify(projectData));
    } catch (error) {
      console.error("Error saving project to localStorage:", error);
    }
  };

  const getSavedTasks = (projectId) => {
    try {
      const savedTasksJSON = localStorage.getItem(`tasks_${projectId}`);
      return savedTasksJSON ? JSON.parse(savedTasksJSON) : [];
    } catch (error) {
      console.error("Error parsing saved tasks JSON:", error);
      return [];
    }
  };

  const saveTasksToLocalStorage = (tasks, projectId) => {
    try {
      localStorage.setItem(`tasks_${projectId}`, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  };

  const handleAddTask = () => {
    if (project && project.task && project.task.trim()) {
      const newTask = { text: project.task.trim(), done: false };
      setProject((prevProject) => ({
        ...prevProject,
        tasks: [...prevProject.tasks, newTask],
        task: "",
      }));
      // Save tasks to local storage
      saveTasksToLocalStorage([...project.tasks, newTask], project.id);
    }
  };

  const handleDeleteTask = (index) => {
    setProject((prevProject) => {
      const updatedTasks = prevProject.tasks.filter((_, i) => i !== index);
      // Save updated tasks to local storage
      saveTasksToLocalStorage(updatedTasks, project.id);
      return { ...prevProject, tasks: updatedTasks };
    });
  };

  const handleEditTask = (index, newText) => {
    setProject((prevProject) => {
      const updatedTasks = prevProject.tasks.map((task, i) =>
        i === index ? { ...task, text: newText } : task
      );
      // Save updated tasks to local storage
      saveTasksToLocalStorage(updatedTasks, project.id);
      return { ...prevProject, tasks: updatedTasks };
    });
  };

  const handleToggleDone = (index) => {
    setProject((prevProject) => {
      const updatedTasks = prevProject.tasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      );
      // Save updated tasks to local storage
      saveTasksToLocalStorage(updatedTasks, project.id);
      return { ...prevProject, tasks: updatedTasks };
    });
  };

  const GotodashBoard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="project-detailspage">
      <div className="pd-23">
        <div className="pd-2">
          <div>
            <input
              type="text"
              placeholder=" Add a task"
              className="aad-task-box"
              value={project && project.task}
              onChange={(e) =>
                setProject((prevProject) => ({
                  ...prevProject,
                  task: e.target.value,
                }))
              }
            />
            <button className="add-task-btn" onClick={handleAddTask}>
              Add
            </button>
            <button className="Dashboard-btn" onClick={GotodashBoard}>
              <i class="fa-solid fa-caret-left"></i>Dashboard
            </button>
          </div>
        </div>

        <div>
          {project && (
            <div className="pd-3">
              {project.tasks.map((task, index) => (
                <div className="task-content" key={index}>
                  <span
                    style={{
                      textDecoration: task.done ? "line-through" : "none",
                    }}
                    onClick={() => handleToggleDone(index)}
                  >
                    <h5>Task&nbsp;#{index + 1}</h5>
                    <hr></hr>
                    <h5>Task</h5>
                    <p className="task-assign">{task.text}</p>
                  </span>
                  <br></br>
                  <hr></hr>

                  <button
                    className="task-done"
                    onClick={() => handleToggleDone(index)}
                  >
                    {task.done ? "Undone" : "Done"}
                  </button>
                  <button
                    className="task-edit"
                    onClick={() =>
                      handleEditTask(index, prompt("Edit task:", task.text))
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="task-delete"
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pd-1">
        <div className="project-content">
          <h1>Project📊</h1>
          {project && (
            <div className="project-content2">
              <h4>{project.title}</h4>
              <h5>{project.status}</h5>
              <p>{project.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
