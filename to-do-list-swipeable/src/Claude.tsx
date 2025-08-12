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
  Fade,
  Grow,
  LinearProgress,
} from "@mui/material";
import { responsiveFontSizes, useTheme } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { motion, AnimatePresence } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: Dayjs | null;
}

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { 
      main: "#00d4ff",
      light: "#4de6ff",
      dark: "#00a3cc",
    },
    secondary: { 
      main: "#ff6b9d",
      light: "#ff9bc4",
      dark: "#cc5570",
    },
    error: { main: "#ff5252" },
    success: { main: "#00e676" },
    warning: { main: "#ffab00" },
    background: {
      default: "#0a0a0f",
      paper: "rgba(15, 15, 25, 0.95)",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif",
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h4: {
      fontWeight: 800,
      background: "linear-gradient(135deg, #00d4ff 0%, #ff6b9d 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 30px rgba(0, 212, 255, 0.3)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(135deg, #00d4ff, #ff6b9d)",
            borderRadius: "10px",
            "&:hover": {
              background: "linear-gradient(135deg, #4de6ff, #ff9bc4)",
            },
          },
        },
        body: {
          background: "radial-gradient(ellipse at top, #1a1a2e 0%, #16213e 25%, #0f0f1e 50%, #0a0a0f 100%)",
          minHeight: "100vh",
          position: "relative",
          "&::before": {
            content: '""',
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `
              radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 107, 157, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(0, 230, 118, 0.05) 0%, transparent 50%)
            `,
            zIndex: -1,
            pointerEvents: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "linear-gradient(145deg, rgba(20, 20, 35, 0.95), rgba(15, 15, 25, 0.9))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.05)
          `,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `
              0 16px 40px rgba(0, 0, 0, 0.7),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              0 0 0 1px rgba(0, 212, 255, 0.2)
            `,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 12,
          padding: "12px 24px",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
            transition: "left 0.5s",
          },
          "&:hover::before": {
            left: "100%",
          },
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `
              0 8px 25px rgba(0, 212, 255, 0.4),
              0 0 20px rgba(0, 212, 255, 0.3)
            `,
          },
        },
        contained: {
          background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4de6ff 0%, #00d4ff 100%)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: 12,
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.08)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 212, 255, 0.5)",
              },
            },
            "&.Mui-focused": {
              background: "rgba(255, 255, 255, 0.1)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00d4ff",
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
              },
            },
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          margin: "8px 0",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateX(8px) scale(1.02)",
            boxShadow: `
              0 12px 30px rgba(0, 0, 0, 0.6),
              0 0 20px rgba(0, 212, 255, 0.2)
            `,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 20,
          backdropFilter: "blur(10px)",
        },
        colorSuccess: {
          background: "linear-gradient(135deg, #00e676, #00c853)",
          color: "#000",
        },
        colorError: {
          background: "linear-gradient(135deg, #ff5252, #d32f2f)",
        },
        colorWarning: {
          background: "linear-gradient(135deg, #ffab00, #f57c00)",
          color: "#000",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 0.4)",
          "&.Mui-checked": {
            color: "#00e676",
          },
          "& .MuiSvgIcon-root": {
            fontSize: 28,
            filter: "drop-shadow(0 0 6px rgba(0, 230, 118, 0.3))",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 10,
          background: "rgba(255, 255, 255, 0.1)",
        },
        bar: {
          borderRadius: 10,
          background: "linear-gradient(90deg, #00d4ff, #00e676)",
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
    { id: 4, text: "Call mom", completed: false, date: null },
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
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercentage = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.8 }}
        >
          {showConfetti && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1500,
                pointerEvents: "none",
                background: "radial-gradient(circle, rgba(0, 230, 118, 0.1) 0%, transparent 70%)",
                animation: "pulse 2s ease-in-out",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 0 },
                  "50%": { opacity: 1 },
                },
              }}
            />
          )}

          <Container
            maxWidth="sm"
            sx={{
              mt: { xs: 3, md: 6 },
              px: { xs: 2, sm: 4 },
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{
                  fontSize: { xs: "clamp(2.5rem, 8vw, 4rem)", sm: "3.5rem" },
                  fontWeight: 800,
                  mb: { xs: 2, sm: 3 },
                  letterSpacing: 2,
                  textShadow: "0 0 40px rgba(0, 212, 255, 0.4)",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 80,
                    height: 4,
                    background: "linear-gradient(90deg, #00d4ff, #ff6b9d)",
                    borderRadius: 2,
                  },
                }}
              >
                TodoMatic ✨
              </Typography>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Paper 
                sx={{ 
                  p: { xs: 3, sm: 4 }, 
                  mb: 4,
                  background: "linear-gradient(145deg, rgba(25, 25, 40, 0.95), rgba(20, 20, 35, 0.9))",
                }} 
                elevation={0}
              >
                <form onSubmit={addTask}>
                  <Stack
                    spacing={3}
                    direction={isSmallScreen ? "column" : "row"}
                    alignItems={isSmallScreen ? "stretch" : "flex-end"}
                  >
                    <TextField
                      label="What needs to be done?"
                      variant="outlined"
                      fullWidth
                      value={input}
                      inputRef={inputRef}
                      onChange={(e) => setInput(e.target.value)}
                      size="medium"
                      autoComplete="off"
                      InputProps={{
                        startAdornment: <AddTaskIcon sx={{ mr: 1, color: "primary.main" }} />,
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "rgba(255, 255, 255, 0.7)",
                          "&.Mui-focused": {
                            color: "#00d4ff",
                          },
                        },
                      }}
                    />
                    <DatePicker
                      label="Due date"
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: isSmallScreen,
                          size: "medium",
                          InputProps: {
                            startAdornment: <CalendarTodayIcon sx={{ mr: 1, color: "secondary.main" }} />,
                          },
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      size="large"
                      sx={{
                        width: { xs: "100%", sm: "auto" },
                        minWidth: 120,
                        height: 56,
                        fontSize: "1.1rem",
                      }}
                      disabled={!input.trim()}
                      startIcon={<AddTaskIcon />}
                    >
                      Add Task
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Paper sx={{ p: 3, mb: 4 }} elevation={0}>
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1.4rem",
                      textAlign: "center",
                      fontWeight: 600,
                      color: "text.primary",
                    }}
                  >
                    {remainingCount} of {tasks.length} tasks remaining
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progressPercentage}
                    sx={{
                      height: 8,
                      borderRadius: 10,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: "text.secondary",
                      fontSize: "1rem",
                    }}
                  >
                    {Math.round(progressPercentage)}% Complete
                  </Typography>
                </Stack>
              </Paper>
            </motion.div>

            <List sx={{ flexGrow: 1, px: 0 }}>
              <AnimatePresence>
                {sortedTasks.map((task, index) => {
                  const overdue = task.date && !task.completed && dayjs().isAfter(task.date, "day");
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 50, scale: 0.95 }}
                      transition={{ 
                        duration: 0.4,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <ListItem
                        sx={{
                          background: task.completed
                            ? "linear-gradient(135deg, rgba(0, 230, 118, 0.1), rgba(0, 200, 83, 0.05))"
                            : overdue
                            ? "linear-gradient(135deg, rgba(255, 82, 82, 0.1), rgba(211, 47, 47, 0.05))"
                            : "linear-gradient(145deg, rgba(30, 30, 45, 0.8), rgba(25, 25, 40, 0.6))",
                          backdropFilter: "blur(20px)",
                          border: `1px solid ${
                            task.completed
                              ? "rgba(0, 230, 118, 0.3)"
                              : overdue
                              ? "rgba(255, 82, 82, 0.3)"
                              : "rgba(255, 255, 255, 0.1)"
                          }`,
                          borderRadius: 16,
                          mb: 2,
                          px: 3,
                          py: 2,
                          cursor: "default",
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: task.completed ? "100%" : "0%",
                            height: "100%",
                            background: "linear-gradient(90deg, rgba(0, 230, 118, 0.05), rgba(0, 230, 118, 0.02))",
                            transition: "width 0.6s ease",
                          },
                        }}
                        disableGutters
                        secondaryAction={
                          <Tooltip title="Delete Task" arrow>
                            <IconButton
                              edge="end"
                              onClick={() => deleteTask(task.id)}
                              size="large"
                              sx={{
                                color: "error.main",
                                "&:hover": {
                                  background: "rgba(255, 82, 82, 0.1)",
                                  transform: "scale(1.1)",
                                },
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <Checkbox
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          size="large"
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<CheckCircleIcon />}
                          sx={{
                            mr: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.1)",
                            },
                          }}
                        />
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: task.completed ? 400 : 600,
                                fontSize: "1.1rem",
                                color: task.completed
                                  ? "rgba(255, 255, 255, 0.5)"
                                  : overdue
                                  ? "error.light"
                                  : "text.primary",
                                textDecoration: task.completed ? "line-through" : "none",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {task.text}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              {task.date ? (
                                <Chip
                                  label={task.date.format("MMM DD, YYYY")}
                                  color={task.completed ? "success" : overdue ? "error" : "warning"}
                                  size="small"
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                  }}
                                />
                              ) : (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "rgba(255, 255, 255, 0.5)",
                                    fontStyle: "italic",
                                  }}
                                >
                                  No due date
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </List>

            {tasks.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Paper
                  sx={{
                    p: 6,
                    textAlign: "center",
                    background: "linear-gradient(145deg, rgba(25, 25, 40, 0.5), rgba(20, 20, 35, 0.3))",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "text.secondary",
                      mb: 2,
                      fontSize: "1.5rem",
                    }}
                  >
                    🎉 All done!
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Add your first task above to get started
                  </Typography>
                </Paper>
              </motion.div>
            )}
          </Container>
        </motion.div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}