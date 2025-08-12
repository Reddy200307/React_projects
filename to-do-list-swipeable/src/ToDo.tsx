import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Stack,
  ThemeProvider,
  createTheme,
  CssBaseline,Chip
} from "@mui/material";
import {  responsiveFontSizes } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import confettiAnim from "./assets/confetti.json"; // <-- download a confetti animation and place here
import dayjs, { Dayjs } from "dayjs";
import "./assets/lottie.css";
interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: Dayjs | null;
}

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontSize: 16, // base size
  },
  components: {
    MuiPaper: {
  styleOverrides: {
    root: {
      backgroundImage: "linear-gradient(145deg, #1e1e1e, #181818)",
      boxShadow: "0px 3px 8px rgba(0,0,0,0.5)",
    },
  },
},

  },
});

darkTheme = responsiveFontSizes(darkTheme);


export default function ToDo() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Eat", completed: true, date: dayjs() },
    { id: 2, text: "Sleep", completed: false, date: null },
    { id: 3, text: "Repeat", completed: false, date: null },
  ]);
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: input.trim(), completed: false, date: selectedDate },
    ]);
    setInput("");
    setSelectedDate(null);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nowCompleted = !t.completed;
          if (nowCompleted) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000); // hide after animation
          }
          return { ...t, completed: nowCompleted };
        }
        return t;
      })
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {showConfetti && (
            <div className="lottieAnimation"            
            >
              <Lottie
                animationData={confettiAnim}
                loop={false}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}

          <Container maxWidth="sm" sx={{ mt: { xs: 2, md: 4 }, px: { xs: 2.5, sm: 3 } }}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{
                fontSize: { xs: "clamp(2rem, 6vw, 2.5rem)", sm: "2.2rem" },
                fontWeight: 700,
              }}
            >
              TodoMatic
            </Typography>

            <Paper sx={{ p: { xs: 2.5, sm: 3 }, mb: 3 }} elevation={3}>
              <form onSubmit={addTask}>
                <Stack
                  spacing={2}
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ sm: "center" }}
                >
                  <TextField
                    label="What needs to be done?"
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <DatePicker
                    label="Due date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    slotProps={{
                      textField: { fullWidth: true, size: "small" },
                    }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                  >
                    Add
                  </Button>
                </Stack>
              </form>
            </Paper>

            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontSize: { xs: "1.2rem", sm: "1.25rem" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {tasks.filter((t) => !t.completed).length} tasks remaining
            </Typography>

            <List>
              <AnimatePresence>
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <ListItem
  sx={{
    bgcolor: "background.paper",
    mb: 1.5,
    borderRadius: 1,
    boxShadow: 1,
    px: 2, // more breathing room
  }}
  disableGutters
>
  <Checkbox
    checked={task.completed}
    onChange={() => toggleTask(task.id)}
  />
  <ListItemText
    primary={task.text}
   secondary={
  task.date ? (
    <Chip
      label={`Due: ${task.date.format("DD MMM YYYY")}`}
      color={task.completed ? "success" : "warning"}
      size="small"
      sx={{ mt: 0.5 }}
    />
  ) : "No date set"
}

    sx={{
      textDecoration: task.completed ? "line-through" : "none",
    }}
  />
  <IconButton
    edge="end"
    aria-label="delete"
    onClick={() => deleteTask(task.id)}
    sx={{ ml: 1 }} // small gap from text
  >
    <DeleteIcon color="error" />
  </IconButton>
</ListItem>

                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          </Container>
        </motion.div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
