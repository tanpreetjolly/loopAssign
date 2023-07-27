import dataset_small from "../data/dataset_small.json";
import Multiselect from "multiselect-react-dropdown";
import Table from "./Table";

type Data = {
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
  number: number;
};
const dataObj: Data[] = dataset_small;
const Filters = () => {
  function getUniqueValues(arr: Data[], property: keyof Data) {
    const uniqueValuesSet = new Set(arr.map((item) => item[property]));
    return Array.from(uniqueValuesSet, (value) => ({ value, display: value }));
  }

  const numbers = getUniqueValues(dataObj, "number");
  const mod3Values = getUniqueValues(dataObj, "mod3");
  const mod4Values = getUniqueValues(dataObj, "mod4");
  const mod5Values = getUniqueValues(dataObj, "mod5");
  const mod6Values = getUniqueValues(dataObj, "mod6");
  console.log(mod3Values);
  return (
    <div>
      <div className="container" style={{ display: "flex", gap: "10px" }}>
        <Multiselect
          options={numbers}
          displayValue="display"
          placeholder="Number"
        />
        <Multiselect
          options={mod3Values}
          displayValue="display"
          placeholder="mod3"
        />
        <Multiselect
          options={mod4Values}
          displayValue="display"
          placeholder="mod4"
        />
        <Multiselect
          options={mod5Values}
          displayValue="display"
          placeholder="mod5"
        />
        <Multiselect
          options={mod6Values}
          displayValue="display"
          placeholder="mod6"
        />
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
};

export default Filters;
