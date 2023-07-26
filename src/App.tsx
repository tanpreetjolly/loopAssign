import "./App.css";
import Multiselect from "multiselect-react-dropdown";
import dataset_small from "./data/dataset_small.json";

type Data = {
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
  number: number;
};

const dataObj: Data[] = dataset_small;

function App() {
  console.log();
  return (
    <>
      <div>
        <Multiselect
          options={dataObj}
          displayValue="number" 
        />
        <Multiselect
          options={dataObj}
          displayValue="mod3" 
        />
        <Multiselect
          options={dataObj}
          displayValue="mod4" 
        />
        <Multiselect
          options={dataObj}
          displayValue="mod5" 
        />
        <Multiselect
          options={dataObj}
          displayValue="mod6" 
        />
      </div>
    </>
  );
}

export default App;
