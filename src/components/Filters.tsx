import dataset_small from "../data/dataset_small.json";
import Multiselect from "multiselect-react-dropdown";
import Table from "./Table";
import { useMemo, useState } from "react";

type Data = {
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
  number: number;
};
const dataObj: Data[] = dataset_small;

const getFiltersValues = (data: Data[]) => {
  function getUniqueValues(arr: Data[], property: keyof Data) {
    const uniqueValuesSet = new Set(arr.map((item) => item[property]));
    return Array.from(uniqueValuesSet, (value) => ({ value, display: value }));
  }

  const numbers = getUniqueValues(data, "number").slice(0, 10);
  const mod3Values = getUniqueValues(data, "mod3");
  const mod4Values = getUniqueValues(data, "mod4");
  const mod5Values = getUniqueValues(data, "mod5");
  const mod6Values = getUniqueValues(data, "mod6");
  console.log(mod3Values);
  return [numbers, mod3Values, mod4Values, mod5Values, mod6Values];
};

const filterData = (data: Data[], filters: any) => {
  return data.filter((item) => {
    return (
      (filters.number.length === 0 || filters.number.includes(item.number)) &&
      (filters.mod3.length === 0 || filters.mod3.includes(item.mod3)) &&
      (filters.mod4.length === 0 || filters.mod4.includes(item.mod4)) &&
      (filters.mod5.length === 0 || filters.mod5.includes(item.mod5)) &&
      (filters.mod6.length === 0 || filters.mod6.includes(item.mod6))
    );
  });
};
    

const Filters = () => {
  const [filters, setFilters] = useState({
    number: [],
    mod3: [],
    mod4: [],
    mod5: [],
    mod6: [],
  });
  console.log(filters);

  const [numbers, mod3Values, mod4Values, mod5Values, mod6Values] = useMemo(
    () => getFiltersValues(dataObj),
    [dataObj]
  );

  const data = useMemo(() => filterData(dataObj, filters), [filters]);

  const handleFilterChange = (filterName: string, selectedList: any[]) => {
    const filter = selectedList.map((item) => item.value);
    setFilters({ ...filters, [filterName]: filter });
    
  };

  return (
    <div>
      <div className="container" style={{ display: "flex", gap: "10px" }}>
        <Multiselect
          options={numbers}
          displayValue="display"
          placeholder="Number"
          onSelect={(selectedList) => {
            handleFilterChange("number", selectedList);
          }}
          onRemove={(selectedList) => {
            handleFilterChange("number", selectedList);
          }}
        />
        <Multiselect
          options={mod3Values}
          displayValue="display"
          placeholder="mod3"
          onSelect={(selectedList) => {
            handleFilterChange("mod3", selectedList);
          }}
          onRemove={(selectedList) => {
            handleFilterChange("mod3", selectedList);
          }}
        />
        <Multiselect
          options={mod4Values}
          displayValue="display"
          placeholder="mod4"
          onSelect={(selectedList) => {
            handleFilterChange("mod4", selectedList);
          }}
          onRemove={(selectedList) => {
            handleFilterChange("mod4", selectedList);
          }}
        />
        <Multiselect
          options={mod5Values}
          displayValue="display"
          placeholder="mod5"
          onSelect={(selectedList) => {
            handleFilterChange("mod5", selectedList);
          }}
          onRemove={(selectedList) => {
            handleFilterChange("mod5", selectedList);
          }}
        />
        <Multiselect
          options={mod6Values}
          displayValue="display"
          placeholder="mod6"
          onSelect={(selectedList) => {
            handleFilterChange("mod6", selectedList);
          }}
          onRemove={(selectedList) => {
            handleFilterChange("mod6", selectedList);
          }}
        />
      </div>
      <div>
        <Table tableData={data} />
      </div>
    </div>
  );
};

export default Filters;
