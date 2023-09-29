import "./App.css";
// import { ViewTable } from "./component/ViewTable";
import { Toaster } from "react-hot-toast";
import ViewTableMui from "./component/viewTableMui/ViewTableMui";

function App() {
  return (
    <>
      {/* <ViewTable /> */}
      <ViewTableMui />
      <Toaster />
    </>
  );
}

export default App;
