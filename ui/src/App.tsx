import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/components/views/home";
import ComponentView from "@/components/views/component-view";

function App() {
  return (
    <main>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view" element={<ComponentView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
