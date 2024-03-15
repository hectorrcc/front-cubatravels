import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Textarea from "@mui/joy/Textarea";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { BugCreate, Project, User } from "../types/types";
import { ChangeEvent, ReactElement, forwardRef, useState } from "react";

interface Prop {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSubmit: (bug: BugCreate) => void;
  users: User[];
  projects: Project[];
}
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalBug({
  open,
  setOpen,
  users,
  projects,
  handleSubmit,
}: Prop) {
  const [form, setForm] = useState<BugCreate>({});
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleChangeDes = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"New Bug"}</DialogTitle>
        <Divider />
        <DialogContent>
          <Box width={{ md: 500 }}>
            <Stack spacing={2}>
              <Stack
                direction={{ md: "row", xs: "column" }}
                justifyContent={{ md: "space-between", xs: "normal" }}
                alignItems={"center"}
              >
                <FormControl sx={{ m: 1, width: "100%" }} size="medium">
                  <InputLabel id="user_id">User</InputLabel>
                  <Select
                    name="userId"
                    labelId="user_id"
                    value={form.userId ? form.userId.toString() : ""}
                    label="User"
                    onChange={handleChange}
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
                <FormControl sx={{ m: 1, width: "100%" }} size="medium">
                  <InputLabel id="project_id">Project</InputLabel>
                  <Select
                    name="projectId"
                    labelId="project_id"
                    value={form.projectId ? form.projectId.toString() : ""}
                    label="Project"
                    onChange={handleChange}
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
              <Stack>
                <Textarea
                  minRows={2}
                  placeholder="Description:"
                  size="lg"
                  variant="outlined"
                  onChange={handleChangeDes}
                  name="description"
                />
              </Stack>
            </Stack>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="contained" onClick={() => handleSubmit(form)}>
            Send
          </Button>
          <Button variant="outlined" color="error" type="reset">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
