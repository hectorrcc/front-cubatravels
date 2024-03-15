import { useEffect, useState } from "react";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { CircularProgress, Container, Stack } from "@mui/material";
import DataGridBugs from "./components/DataGridBugs";
import Alert from "@mui/material/Alert";
import Filter from "./components/filter";
import axios from "axios";
import { Bug, BugCreate, FilterType } from "./types/types";
import Button from "@mui/material/Button";
import ModalBug from "./components/modal";

function App() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    const url = "http://127.0.0.1:3000/api";
    const getUsers = async () => {
      try {
        const users = (await axios.get(`${url}/users`)).data.users;
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    const getProjects = async () => {
      try {
        const projects = (await axios.get(`${url}/projects`)).data.projects;
        setProjects(projects);
      } catch (error) {
        console.log(error);
      }
    };
    const getBugs = async () => {
      try {
        const bugs = (await axios.get(`${url}/bugs?start_date=2000-01-01`)).data
          .bugs;
        setBugs(bugs);
      } catch (error) {
        console.log(error);
      }
    };
    Promise.all([getUsers(), getProjects(), getBugs()]);
    setLoading(false);
  }, []);

  const handleFilter = async (filter: FilterType) => {
    setError("");
    setLoading(true);
    const url = `http://127.0.0.1:3000/api/bugs?user_id=${filter.user_id}&project_id=${filter.project_id}&start_date=${filter.start_date}&end_date=${filter.end_date}`;
    try {
      const bugs = (await axios.get(url)).data.bugs;
      setBugs(bugs);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setBugs([]);
    }
    setOpenModal(false);
    setLoading(false);
  };

  const handleSubmit = async (bug: BugCreate) => {
    setLoading(true);
    const url = `http://127.0.0.1:3000/api/bugs`;

    try {
      const newBug = (await axios.post(url, bug)).data.bug as Bug;
      setBugs([...bugs, newBug]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setOpenModal(false);
  };

  const Loading = () => {
    if (loading) {
      return (
        <Stack
          display={"flex"}
          alignItems={"center"}
          position={"fixed"}
          width={"100%"}
          height={"100%"}
        >
          <Stack marginTop={40}>
            <CircularProgress />
          </Stack>
        </Stack>
      );
    }
  };
  const Modal = () => {
    if (openModal) {
      return (
        <ModalBug
          open={openModal}
          setOpen={setOpenModal}
          users={users}
          projects={projects}
          handleSubmit={handleSubmit}
        />
      );
    }
  };

  return (
    <>
      {Loading()}
      <ResponsiveAppBar />
      <Container style={{ marginTop: 100 }}>
        <Stack direction={"column"} spacing={4}>
          <Stack
            direction={{ md: "row", xs: "column" }}
            justifyContent={{ md: "end", xs: "center" }}
            alignItems={"center"}
          >
            <Filter
              users={users}
              projects={projects}
              handleFilter={handleFilter}
            />
            <Stack padding={1}>
              <Button onClick={() => setOpenModal(true)} variant="contained">
                New Bug
              </Button>
            </Stack>
          </Stack>

          <DataGridBugs bugs={bugs} />

          {error ? <Alert severity="error">{error}</Alert> : undefined}
        </Stack>
        {Modal()}
      </Container>
    </>
  );
}

export default App;
