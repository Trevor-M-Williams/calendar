import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AssignedSelect() {
  const { taskData, setTaskData } = useContext(TaskContext);

  function handleChange(e) {
    setTaskData({ ...taskData, assigned: e.target.value });
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Assigned To</InputLabel>
        <Select
          value={taskData.assigned || []}
          label="Assigned To"
          onChange={handleChange}
          multiple
          required
        >
          <MenuItem value="CJ">CJ</MenuItem>
          <MenuItem value="Logan">Logan</MenuItem>
          <MenuItem value="Trevor">Trevor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
