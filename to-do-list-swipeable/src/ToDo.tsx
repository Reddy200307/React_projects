import React, { useState, useEffect, useRef, useCallback } from "react";
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
  CssBaseline,
  Chip,
  Tooltip,
  useMediaQuery,
  Box,
} from "@mui/material";
import { responsiveFontSizes, useTheme } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import confettiAnim from "./assets/confetti.json";
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
    primary: { main: "#64b5f6" },
    secondary: { main: "#ff80ab" },
    error: { main: "#f44336" },
    success: { main: "#4caf50" },
    warning: { main: "#ffb74d" },
    background: {
      default: "#0e0e10",
      paper: "rgba(30, 30, 30, 0.85)",
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: "linear-gradient(135deg, #0e0e10 0%, #1a1a1d 100%)",
          minHeight: "100vh",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundImage:
            "linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.85))",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)",
          transition: "all 0.3s ease",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.25s ease",
          borderRadius: 8,
          "&:hover": {
            boxShadow: "0 0 12px rgba(100, 181, 246, 0.75)",
          },
          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.6)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          userSelect: "none",
        },
      },
    },
  },
});

darkTheme = responsiveFontSizes(darkTheme);

export default function ToDo() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Finish UI for TodoMatic", completed: false, date: dayjs().add(1, "day") },
    { id: 2, text: "Buy groceries", completed: true, date: dayjs().subtract(1, "day") },
    { id: 3, text: "Plan weekend trip", completed: false, date: dayjs().add(3, "day") },
  ]);
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sort tasks with null dates last, ascending order by date
  const sortedTasks = React.useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.diff(b.date);
    });
  }, [tasks]);

  const addTask = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim()) return;
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: input.trim(),
          completed: false,
          date: selectedDate,
        },
      ]);
      setInput("");
      setSelectedDate(null);
      inputRef.current?.focus();
    },
    [input, selectedDate]
  );

  const toggleTask = useCallback(
    (id: number) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === id) {
            const nowCompleted = !t.completed;
            if (nowCompleted) {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 3000);
            }
            return { ...t, completed: nowCompleted };
          }
          return t;
        })
      );
    },
    []
  );

  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const remainingCount = tasks.filter((t) => !t.completed).length;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          {showConfetti && (
            <Box
              className="lottieAnimation"
              sx={{
                pointerEvents: "none",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1500,
              }}
            >
              <Lottie animationData={confettiAnim} loop={false} />
            </Box>
          )}

          <Container
            maxWidth="sm"
            sx={{
              mt: { xs: 3, md: 6 },
              px: { xs: 2, sm: 4 },
              userSelect: "none",
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{
                fontSize: { xs: "clamp(2rem, 7vw, 3rem)", sm: "2.8rem" },
                fontWeight: 700,
                mb: { xs: 3, sm: 4 },
                letterSpacing: 1.2,
                userSelect: "text",
              }}
              tabIndex={0}
            >
              TodoMatic
            </Typography>

            <Paper sx={{ p: { xs: 2.5, sm: 3 }, mb: 4 }} elevation={6} component="section" aria-label="Add new task form">
              <form onSubmit={addTask}>
                <Stack
                  spacing={2}
                  direction={isSmallScreen ? "column" : "row"}
                  alignItems={isSmallScreen ? "stretch" : "center"}
                >
                  <TextField
                    label="What needs to be done?"
                    variant="outlined"
                    fullWidth
                    value={input}
                    inputRef={inputRef}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isSmallScreen) {
                        addTask();
                        e.preventDefault(); // prevent form submission on mobile because of the DatePicker
                      }
                    }}
                    size="medium"
                    autoComplete="off"
                    aria-label="Task description"
                  />
                  <DatePicker
                    label="Due date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: isSmallScreen,
                        size: "medium",
                        inputProps: {
                          "aria-label": "Select due date",
                          onKeyDown: (e: React.KeyboardEvent) => {
                            // Submit on Enter inside date picker input
                            if (e.key === "Enter") {
                              addTask();
                              e.preventDefault();
                            }
                          },
                        },
                      },
                    }}
                    disablePast={false}
                    
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                      width: { xs: "100%", sm: "auto" },
                      flexShrink: 0,
                    }}
                    disabled={!input.trim()}
                    aria-label="Add task"
                  >
                    Add
                  </Button>
                </Stack>
              </form>
            </Paper>

            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontSize: { xs: "1.2rem", sm: "1.3rem" },
                textAlign: "center",
                fontWeight: 600,
                color: "text.secondary",
                userSelect: "text",
              }}
              tabIndex={0}
              aria-live="polite"
            >
              {remainingCount} task{remainingCount !== 1 && "s"} remaining
            </Typography>

            <List aria-label="Task list" sx={{ flexGrow: 1 }}>
              <AnimatePresence>
                {sortedTasks.map((task) => {
                  const overdue = task.date && !task.completed && dayjs().isAfter(task.date, "day");
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ duration: 0.25 }}
                      style={{ width: "100%", margin: "auto" }}
                    >
                      <ListItem
                        sx={{
                          bgcolor: "background.paper",
                          mb: 1.5,
                          borderRadius: 2,
                          boxShadow: 2,
                          px: 2,
                          py: 1.25,
                          cursor: "default",
                          userSelect: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          "&:hover": {
                            transform: "scale(1.03)",
                            transition: "transform 0.25s ease",
                            boxShadow: 6,
                          },
                        }}
                        disableGutters
                        secondaryAction={
                          <Tooltip title="Delete Task">
                            <IconButton
                              edge="end"
                              aria-label={`Delete task: ${task.text}`}
                              onClick={() => deleteTask(task.id)}
                              size="large"
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <Checkbox
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          inputProps={{ "aria-label": `Mark task "${task.text}" completed` }}
                          size={isSmallScreen ? "medium" : "small"}
                        />
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                userSelect: "text",
                                fontWeight: task.completed ? 400 : 600,
                                color: task.completed
                                  ? "text.disabled"
                                  : overdue
                                  ? "error.main"
                                  : "text.primary",
                                textDecoration: task.completed ? "line-through" : "none",
                              }}
                            >
                              {task.text}
                            </Typography>
                          }
                          secondary={
                            task.date ? (
                              <Chip
                                label={`Due: ${task.date.format("DD MMM YYYY")}`}
                                color={task.completed ? "success" : overdue ? "error" : "warning"}
                                size="small"
                                sx={{ mt: 0.5, userSelect: "none" }}
                              />
                            ) : (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontStyle: "italic", userSelect: "none" }}
                              >
                                No date set
                              </Typography>
                            )
                          }
                        />
                      </ListItem>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </List>
          </Container>
        </motion.div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
