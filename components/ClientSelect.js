import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ClientSelect() {
  const { taskData, setTaskData } = useContext(TaskContext);
  const clients = [
    "Aesthetics & Wellness",
    "CaseIkon",
    "Chef Adam",
    "Coryn Nelson Photography",
    "CyberTekIQ",
    "Luminate Denver",
    "Ricava Tequila",
    "Shoshone Adventures",
    "S3 Cases",
    "Valiant Living",
    "Westmeath Inc.",
  ];

  function handleChange(e) {
    setTaskData({ ...taskData, client: e.target.value });
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Client</InputLabel>
        <Select
          id="demo-simple-select"
          value={taskData.client || ""}
          label="Client"
          onChange={handleChange}
          required
        >
          {clients.map((client, i) => (
            <MenuItem key={i} value={client}>
              {client}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
