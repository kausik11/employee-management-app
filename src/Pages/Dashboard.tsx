import { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

ModuleRegistry.registerModules([AllCommunityModule]);

type Employee = {
  name: string;
  email: string;
  phone?: string;
  role: "Developer" | "Designer" | "Manager";
  joiningDate: string;
};

const Dashboard: React.FC = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [rowData, setRowData] = useState<Employee[]>([]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      const parsedData = JSON.parse(storedEmployees);
      setEmployees(parsedData);
    setRowData(parsedData); 
    }
  }, []);

  const [columnDefs] = useState<ColDef[]>([
    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
    { headerName: "Role", field: "role", sortable: true, filter: true },
    { headerName: "Joining Date", field: "joiningDate", sortable: true, filter: "agDateColumnFilter" },
  ]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div style={{ width: "100%", height: "400px" }}>
        <AgGridReact 
          columnDefs={columnDefs} 
          rowData={rowData} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
