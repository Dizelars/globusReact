// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import React from "react";
// Импортируем Canvas из rtf
// import { Canvas } from '@react-three/fiber'
// import Experience from './components/Experience.jsx'
// import * as THREE from 'three';

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
