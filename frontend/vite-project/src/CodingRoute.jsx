import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import htmlCss from "./AllPages/coding/Htmlcss";
export default function allCodingRoute() {
    return(

        <>
        <Router>
              <Routes>
                  <Route path='/HTML-CSS' element={<htmlCss/>} />

                

              </Routes>

        </Router>
        
        </>
    )
}