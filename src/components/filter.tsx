import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Stack, TextField } from "@mui/material";
import { FilterType, Project, User } from "../types/types";
import { ChangeEvent, useState } from "react";

interface Prop {
  users: User[];
  projects: Project[];
  handleFilter: (filter: FilterType) => void;
}

export default function Filter({ users, projects, handleFilter }: Prop) {
  const [filter, setFilter] = useState<FilterType>({});

  const handleChangeSelect = (event: SelectChangeEvent) => {
    event.preventDefault();
    setFilter({ ...filter, [event.target.name]: event.target.value });
    handleFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
    handleFilter({ ...filter, [event.target.name]: event.target.value });
  };

  return (
    <Stack direction={{ md: "row", xs: "column" }} spacing={{ md: 1, xs: 2 }}>
      <Stack direction={"row"} spacing={1}>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="demo-select-small-label">User</InputLabel>
          <Select
            name="user_id"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filter.user_id ? filter.user_id.toString() : ""}
            label="User"
            onChange={handleChangeSelect}
          >
            {users.map((user) => {
              return (
                <MenuItem key={user.id} value={user.id}>
                  {`${user.name} ${user.surname}`}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="demo-select-small-label">Project</InputLabel>
          <Select
            name="project_id"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filter.project_id ? filter.project_id.toString() : ""}
            label="Project"
            onChange={handleChangeSelect}
          >
            {projects.map((project) => {
              return (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      <Stack direction={"row"} spacing={1}>
        <FormControl sx={{ maxWidth: 150 }} size="small">
          <TextField
            name="start_date"
            label={"Start date"}
            focused
            type="date"
            size="small"
            placeholder="Start date"
            value={filter.start_date}
            onChange={handleChangeDate}
          />
        </FormControl>
        <FormControl sx={{ maxWidth: 150 }} size="small">
          <TextField
            name="end_date"
            label={"End date"}
            focused
            type="date"
            size="small"
            placeholder="Start date"
            value={filter.end_date}
            onChange={handleChangeDate}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
}
