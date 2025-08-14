import { StrictMode,Suspense ,type CSSProperties} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { lazy } from 'react';
const App = lazy(() => import('./App.tsx'));
import {ClipLoader} from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "30% auto",
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<ClipLoader color='white' size={250}  aria-label="Loading Spinner"cssOverride={override} />}>
    <App />
    
    </Suspense>
  </StrictMode>,
)
