import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import TwinCitiesAIDepartment from "@/pages/TwinCitiesAIDepartment";
import { LeadFormProvider } from "@/components/LeadFormProvider";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <LeadFormProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/twin-cities-ai-department" element={<TwinCitiesAIDepartment />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </LeadFormProvider>
                <Toaster
                    theme="dark"
                    position="bottom-right"
                    richColors
                    closeButton
                />
            </BrowserRouter>
        </div>
    );
}

export default App;
