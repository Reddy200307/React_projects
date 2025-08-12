import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Snackbar,
  Alert,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { motion, AnimatePresence } from "framer-motion";

interface Expense {
  id: string;
  name: string;
  amount: number;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#ffb74d" },
    background: { default: "#0e0e0e", paper: "#1a1a1a" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const showSnackbar = (message: string, severity: "success" | "error" = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const generateId = () =>
    `expense-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isAddDisabled()) handleAddExpense();
  };

  const isAddDisabled = () => {
    if (!name.trim()) return true;
    const amtNum = parseFloat(amount);
    return isNaN(amtNum) || amtNum <= 0;
  };

  const handleAddExpense = () => {
    setError("");
    if (!name.trim()) {
      setError("Expense name is required");
      return;
    }
    const amtNum = parseFloat(amount);
    if (isNaN(amtNum) || amtNum <= 0) {
      setError("Amount must be a positive number");
      return;
    }
    const newExpense: Expense = {
      id: generateId(),
      name: name.trim(),
      amount: amtNum,
    };
    setExpenses((prev) => [newExpense, ...prev]);
    setName("");
    setAmount("");
    showSnackbar("Expense added!");
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showSnackbar("Expense deleted");
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all expenses?")) {
      setExpenses([]);
      showSnackbar("All expenses cleared");
    }
  };

  const total = expenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ pt: 4, px: { xs: 2, sm: 3 } }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            sx={{
              background: "linear-gradient(90deg, #90caf9, #ffb74d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Personal Expenses Calculator
          </Typography>
        </motion.div>

        {/* Input form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            mb={3}
            alignItems="center"
            component={Paper}
            elevation={4}
            sx={{
              p: 3,
              bgcolor: "background.paper",
              borderRadius: 3,
              backdropFilter: "blur(8px)",
            }}
          >
            <TextField
              label="Expense Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={handleKeyDown}
              autoFocus
              fullWidth
              size="small"
            />
            <TextField
              label="Amount ($)"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={handleKeyDown}
              type="number"
              fullWidth
              size="small"
              sx={{ maxWidth: { xs: "100%", sm: 120 } }}
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                onClick={handleAddExpense}
                size={isXs ? "medium" : "small"}
                disabled={isAddDisabled()}
                startIcon={<AddIcon />}
                sx={{
                  minWidth: { xs: "100%", sm: 120 },
                  borderRadius: 2,
                  boxShadow: "0 4px 10px rgba(144,202,249,0.3)",
                }}
              >
                Add
              </Button>
            </motion.div>
          </Stack>
        </motion.div>

        {error && (
          <Typography color="error" mb={2} textAlign="center">
            {error}
          </Typography>
        )}

        {/* Expenses list */}
        <Paper
          sx={{
            maxHeight: 360,
            overflowY: "auto",
            mb: 2,
            bgcolor: "background.paper",
            borderRadius: 3,
          }}
          elevation={4}
        >
          <List>
            <AnimatePresence>
              {expenses.length === 0 && (
                <Typography
                  textAlign="center"
                  color="text.secondary"
                  sx={{ py: 5 }}
                >
                  No expenses yet. Add one!
                </Typography>
              )}
              {expenses.map(({ id, name, amount }) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
                  }}
                  style={{ width: "100%" }}
                >
                  <ListItem
                    secondaryAction={
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <IconButton
                          edge="end"
                          onClick={() => handleDelete(id)}
                          size={isXs ? "small" : "medium"}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </motion.div>
                    }
                    divider
                  >
                    <ListItemText
                      primary={name}
                      secondary={`$${amount.toFixed(2)}`}
                    />
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Paper>

        {/* Total and Clear All */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: 1,
              mb: 2,
              bgcolor: "background.paper",
              p: 2,
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary.light"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Total: ${total.toFixed(2)}
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                color="error"
                onClick={handleClearAll}
                disabled={expenses.length === 0}
                fullWidth={isXs}
                size={isXs ? "medium" : "small"}
              >
                Clear All
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
