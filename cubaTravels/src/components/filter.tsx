import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";
import { Project, User } from "../types/typs";
import { useState } from "react";

interface Prop{
    users: User[],
    projects: Project[]
    handleFilter: ()=> void
}
export default function Filter({users, projects, handleFilter}: Prop) {
  const [userId, setUserid] = useState(0)
  const [projectId, setProjectid] = useState(0)

  const handleUser =(event: SelectChangeEvent)=>{
    setUserid(event.target.value as number)
    handleFilter()
  }


  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">User</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
         
          label="Age"
          onChange={handleFilter}
        >
            {users.map((user)=>{
              return  <MenuItem value={user.id}>{user.name}</MenuItem>
            })}
          
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Project</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {projects.map((project)=>{
              return  <MenuItem value={project.id}>{project.name}</MenuItem>
            })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <TextField label={"Start date"} focused type="date" size="small" placeholder="Start date"  />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
       
        <TextField label={"End date"} focused type="date" size="small" placeholder="Start date"  />
      </FormControl>
    </div>
  );
}
