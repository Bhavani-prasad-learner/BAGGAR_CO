import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element. Make sure you have a div with id 'root' in your index.html");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error("Failed to render the app:", error);
  rootElement.innerHTML = `
    <div style="color: red; padding: 20px;">
      <h1>Something went wrong</h1>
      <p>${error instanceof Error ? error.message : 'Unknown error occurred'}</p>
      <p>Please check the console for more details.</p>
    </div>
  `;
}
