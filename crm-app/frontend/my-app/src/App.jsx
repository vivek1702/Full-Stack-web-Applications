import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LeadManagement from "./pages/Leads/LeadManagement";
import LeadList from "./pages/Leads/LeadList";
import AddNewLead from "./pages/Leads/AddNewLead";
import SalesAgentManagement from "./pages/SalesAgents/SalesAgentManagement";
import { EditLeads } from "./pages/Leads/EditLeads";
import SalesAgentList from "./pages/SalesAgents/SalesAgentList";
import ReportManagement from "./pages/Reports/ReportManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leadManage/:id" element={<LeadManagement />} />
        <Route path="/leadLists" element={<LeadList />} />
        <Route path="/addNewLead" element={<AddNewLead />} />
        <Route path="/editleads/:id" element={<EditLeads />} />
        <Route path="/salesAgentManagment" element={<SalesAgentManagement />} />
        <Route path="/salesAgentList" element={<SalesAgentList />} />
        <Route path="/reports" element={<ReportManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
