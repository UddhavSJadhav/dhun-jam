import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext.jsx";

import Router from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
