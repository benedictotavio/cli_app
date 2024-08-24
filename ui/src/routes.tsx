import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";

const routes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export { routes as RoutesDOM };