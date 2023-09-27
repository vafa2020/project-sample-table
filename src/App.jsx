import "./App.css";
import { ViewTable } from "./component/ViewTable";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ViewTable />
      <Toaster />
    </>
  );
}

export default App;
