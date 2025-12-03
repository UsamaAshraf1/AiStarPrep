import React from "react";
import AppRoutes from "./routes/route";
import { ModalProvider } from "./helper/ModalContext";
import { initGA, logPageView } from "./analytics";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);
  return (
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
  );
}

export default App;
