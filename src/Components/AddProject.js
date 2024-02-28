
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Context/Url";

function AddProject() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [URL, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null); // Added status state

  const handleSubmit = async () => {
    if (!title || !description) {
      // Check for required fields
      setStatus("Please fill out the required fields: Title and Description");
      return;
    }

    try {
      await axios.post(API_URL, {
        title,
        URL,
        description,
      });
      navigate("/dashboard");
      const successMessage = "Project successfully added!";
      setStatus(successMessage);
      alert(successMessage); // Show alert
    } catch (error) {
      console.error("Error adding project:", error);
      const errorMessage = "An error occurred while adding the project.";
      setStatus(errorMessage);
      alert(errorMessage); // Show alert
    }
  };

  return (
    <>
      <div className="add-project-page">
        <div className="picture-add-page">
          <img
            src="https://img.freepik.com/free-vector/teamwork-concept-with-business-presentation_23-2147857539.jpg?w=740&t=st=1696184507~exp=1696185107~hmac=55d97d9a659f435e871c5ff31c7f2e9dce8b1eec14d3ca01c2217c42699813f6"
            alt="pic"
          />
        </div>
        <div className="add-project">
          <div className="form-element">
            <Form className="form-element1">
              <Form.Group className="mb-3">
                <Form.Label className="headings">Diary Manager</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Notes Title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="headings">Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type Project URL"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="headings">Diary notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Diary notes..."
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                style={{
                  color: "rgb(0, 0, 0))",
                  fontSize: "15px",
                  fontFamily: "sherif",
                  fontWeight: "900",
                }}
              >
                Max 30 words
              </Form.Group>
              <Button variant="outline-light" onClick={handleSubmit}>
                Submit
              </Button>
              {status && (
                <div
                  style={{
                    marginTop: "10px",
                    color: status.includes("successfully") ? "green" : "red",
                  }}
                >
                  {status}
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProject;
