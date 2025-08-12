// Ekart - Single-file React + TypeScript demo app
// ------------------------------------------------
// How to use:
// 1) Create a new Vite React + TS project or CRA TS project.
//    Recommended (Vite): `npm create vite@latest ekart -- --template react-ts`
// 2) Install dependencies:
//    npm install @mui/material @mui/icons-material @emotion/react @emotion/styled framer-motion react-router-dom
// 3) Replace src/App.tsx with this file's contents (or import it as a main component).
// 4) Run `npm install` then `npm run dev` (Vite) or `npm start` (CRA).
//
// Notes:
// - Uses Material UI in dark mode
// - Uses Framer Motion for subtle animations
// - Uses react-router-dom for dynamic routing (product/:id)
// - Uses external Unsplash images
// - Small in-memory cart (no backend)

import React, { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, IconButton, Badge, Drawer, Box, Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Chip, TextField, InputBase } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon, ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';

// -------------------- Types --------------------
type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: string;
};

type CartItem = {
  product: Product;
  qty: number;
};

// -------------------- Mock Data --------------------
const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Air Wireless Headphones',
    price: 4999,
    description: 'Comfort-first wireless headphones with deep bass and 30h battery.',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155227c009?auto=format&fit=crop&w=1200&q=60',
    category: 'Electronics',
  },
  {
    id: 'p2',
    title: 'Minimal Leather Backpack',
    price: 3499,
    description: 'Handsome everyday carry backpack made with durable fabric.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=60',
    category: 'Bags',
  },
  {
    id: 'p3',
    title: 'Classic Running Shoes',
    price: 2999,
    description: 'Lightweight shoes built for comfort and long runs.',
    image: 'https://images.unsplash.com/photo-1542293787938-c9e299b88028?auto=format&fit=crop&w=1200&q=60',
    category: 'Footwear',
  },
  {
    id: 'p4',
    title: 'Smartwatch Series X',
    price: 7999,
    description: 'Your health companion with workouts, sleep and notifications.',
    image: 'https://images.unsplash.com/photo-1519741498747-12e6a8ee8f0f?auto=format&fit=crop&w=1200&q=60',
    category: 'Wearables',
  },
  {
    id: 'p5',
    title: 'Ceramic Mug (Set of 2)',
    price: 699,
    description: 'Elegant stoneware mugs for your morning ritual.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=60',
    category: 'Home',
  },
];

// -------------------- Theme --------------------
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    background: { default: '#0f1720', paper: '#111827' },
  },
  components: {
    MuiAppBar: { defaultProps: { elevation: 1 } },
  },
});

// -------------------- Helpers --------------------
const currency = (n: number) => `₹${n.toFixed(0)}`;

// -------------------- Header --------------------
function Header({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) {
  return (
    <AppBar position="sticky" color="transparent" sx={{ backdropFilter: 'blur(6px)' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
          Ekart
        </Typography>

        <SearchBox />

        <IconButton aria-label="cart" onClick={onOpenCart} size="large" sx={{ ml: 1 }}>
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

// -------------------- SearchBox --------------------
function SearchBox() {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' }, mx: 2 }}>
      <InputBase placeholder="Search products..." sx={{ px: 2, py: 0.5, bgcolor: 'background.paper', borderRadius: 1 }} />
    </Box>
  );
}

// -------------------- ProductCard --------------------
function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return (
    <motion.div whileHover={{ y: -6 }} style={{ height: '100%' }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia component="img" height="180" image={product.image} alt={product.title} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" gutterBottom>{product.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{product.description}</Typography>
          <Chip label={currency(product.price)} size="small" />
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to={`/product/${product.id}`}>View</Button>
          <Button size="small" onClick={() => onAdd(product)}>Add</Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}

// -------------------- ProductList Page --------------------
function ProductList({ onAdd }: { onAdd: (p: Product) => void }) {
  return (
    <Container sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Fresh picks for you</Typography>
      </motion.div>

      <Grid container spacing={3}>
        {PRODUCTS.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <ProductCard product={p} onAdd={onAdd} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// -------------------- Product Detail Page (dynamic routing) --------------------
function ProductPage({ onAdd }: { onAdd: (p: Product) => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => PRODUCTS.find((x) => x.id === id), [id]);

  if (!product) {
    return (
      <Container sx={{ py: 6 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Back</Button>
        <Typography variant="h6">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Back</Button>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardMedia component="img" image={product.image} alt={product.title} />
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{product.title}</Typography>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>{currency(product.price)}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>
          <Button variant="contained" onClick={() => { onAdd(product); navigate('/cart'); }}>Buy Now</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

// -------------------- Cart Drawer --------------------
function CartDrawer({ open, onClose, items, updateQty, clearCart }: { open: boolean; onClose: () => void; items: CartItem[]; updateQty: (id: string, qty: number) => void; clearCart: () => void }) {
  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 360, p: 2 }}>
        <Typography variant="h6">Your cart</Typography>
        <Box sx={{ mt: 2 }}>
          {items.length === 0 && <Typography color="text.secondary">Cart is empty</Typography>}
          {items.map((it) => (
            <Box key={it.product.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
              <img src={it.product.image} alt={it.product.title} style={{ width: 72, height: 56, objectFit: 'cover', borderRadius: 6 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2">{it.product.title}</Typography>
                <Typography variant="caption" color="text.secondary">{currency(it.product.price)}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button size="small" onClick={() => updateQty(it.product.id, Math.max(0, it.qty - 1))}>-</Button>
                  <TextField size="small" value={it.qty} inputProps={{ style: { width: 36, textAlign: 'center' } }} onChange={(e) => updateQty(it.product.id, Math.max(0, Number(e.target.value || 0)))} />
                  <Button size="small" onClick={() => updateQty(it.product.id, it.qty + 1)}>+</Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Subtotal: {currency(subtotal)}</Typography>
          <Button fullWidth variant="contained" sx={{ mt: 2 }}>Proceed to checkout</Button>
          <Button fullWidth color="inherit" sx={{ mt: 1 }} onClick={clearCart}>Clear cart</Button>
        </Box>
      </Box>
    </Drawer>
  );
}

// -------------------- Cart Page (route) --------------------
function CartPage({ items, updateQty, clearCart }: { items: CartItem[]; updateQty: (id: string, qty: number) => void; clearCart: () => void }) {
  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5">Cart</Typography>
      <Box sx={{ mt: 2 }}>
        {items.length === 0 && <Typography color="text.secondary">Your cart is empty — add something tasty!</Typography>}
        {items.map((it) => (
          <Box key={it.product.id} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <img src={it.product.image} alt="" style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 8 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography>{it.product.title}</Typography>
              <Typography variant="caption" color="text.secondary">{currency(it.product.price)}</Typography>
            </Box>
            <Box>
              <Button size="small" onClick={() => updateQty(it.product.id, Math.max(0, it.qty - 1))}>-</Button>
              <TextField size="small" value={it.qty} inputProps={{ style: { width: 36, textAlign: 'center' } }} onChange={(e) => updateQty(it.product.id, Math.max(0, Number(e.target.value || 0)))} />
              <Button size="small" onClick={() => updateQty(it.product.id, it.qty + 1)}>+</Button>
            </Box>
          </Box>
        ))}

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Total: {currency(subtotal)}</Typography>
          <Button variant="contained" sx={{ mt: 2 }}>Checkout</Button>
          <Button color="inherit" sx={{ mt: 1 }} onClick={clearCart}>Clear cart</Button>
        </Box>
      </Box>
    </Container>
  );
}

// -------------------- Home Page --------------------
function Home() {
  return (
    <Container sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>Welcome to Ekart</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>A small demo shopping app built with React + TypeScript + MUI + Framer Motion (dark mode).</Typography>
      </motion.div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Trending</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              {PRODUCTS.slice(0, 3).map((p) => (
                <Box key={p.id} sx={{ flex: 1 }} component={Link} to={`/product/${p.id}`}>
                  <Card sx={{ p: 1 }}>
                    <CardMedia component="img" height="140" image={p.image} alt={p.title} />
                    <CardContent>
                      <Typography variant="subtitle1">{p.title}</Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Categories</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
              {[...new Set(PRODUCTS.map((p) => p.category))].map((c) => (
                <Chip key={c} label={c} clickable component={Link} to={`/search?cat=${c}`} />
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// -------------------- App (root) --------------------
export default function App(): JSX.Element {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(product: Product) {
    setCart((prev) => {
      const found = prev.find((p) => p.product.id === product.id);
      if (found) {
        return prev.map((it) => (it.product.id === product.id ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { product, qty: 1 }];
    });
  }

  function updateQty(id: string, qty: number) {
    setCart((prev) => prev
      .map((it) => (it.product.id === id ? { ...it, qty } : it))
      .filter((it) => it.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cart} updateQty={updateQty} clearCart={clearCart} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList onAdd={addToCart} />} />
          <Route path="/product/:id" element={<ProductPage onAdd={addToCart} />} />
          <Route path="/cart" element={<CartPage items={cart} updateQty={updateQty} clearCart={clearCart} />} />
          <Route path="*" element={<Container sx={{ py: 4 }}><Typography>Not Found</Typography></Container>} />
        </Routes>

        <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
          <Typography variant="caption">© Ekart demo — built with ❤️</Typography>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}
