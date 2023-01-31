import { BrowserRouter, Routes, Route } from "react-router-dom";
import AxiosAPI from "./page/AxiosAPI";

import ComponentsTest from "./page/ComponentsTest";
import DrawingBoard from "./page/DrawingBoard";
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
          <Route path="/drawing" element={<DrawingBoard />} />
          <Route path="/axios" element={<AxiosAPI />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
