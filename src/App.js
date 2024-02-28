import NavBar from "./Components/NavBar";
// import SideBar from "./Components/SideBar";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import AddProject from "./Components/AddProject";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import EditProjects from "./Components/EditProjects";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RiseLoader} from "react-spinners";
import PrivateRoutes from "./Pri-Route/PrivateRoutes";
import ProjectDetails from "./Components/ProjectDetails";
import { ProjectProvider } from "./Context/ProjectContext";

function App() {
  console.log(process.env.REACT_APP_API_URL)
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">
        <RiseLoader
          color={"rgb(90, 183, 169)"} // Set your desired color
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>) : (
        <>
          {/* <NavBar/> */}
          <BrowserRouter>
            <div className="sidebar-wrapper">
              <NavBar />
            </div>
            <div>
            <ProjectProvider>
              <Routes>
                <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addproject" element={<AddProject />} />
                <Route path="/editprojects" element={<EditProjects />} />
                <Route path="/projectdetails" element={<ProjectDetails />} />

                <Route path="*" element= {<Navigate to="login"/>} />
                
                
                

                </Route>
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
              </ProjectProvider>
             
            </div>
             
          </BrowserRouter>
        </>
      )}
    </div>
  );
}

export default App;
