import { BrowserRouter, Routes, Route } from "react-router-dom";

import ComponentsTest from "./page/ComponentsTest";
import HooksTest from "./page/HooksTest";
import Search from "./page/Search";
import Todo from "./page/Todo";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ComponentsTest />} />
          <Route path="/hook" element={<HooksTest />} />
          <Route path="/search" element={<Search />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
