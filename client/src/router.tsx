import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./pages/App";

function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
