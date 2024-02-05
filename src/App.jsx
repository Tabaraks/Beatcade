import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main";
import Season from "./pages/Season";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="season" element={<Season />} />

        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
