import {Route, Routes} from 'react-router-dom'
import Page from "./Page";
import React from "react";

export default function App() {
    return (
        <Routes>
            <Route path=":ref" element={<Page />} />
        </Routes>
    )
}
