import 
 { useState, useEffect, useMemo, useCallback } from "react";
import Multiselect from "multiselect-react-dropdown";
import Table from "./Table";
import dataset_small from "../data/dataset_small.json";

type Data = {
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
  number: number;
};

const Filters = () => {
  const dataObj: Data[] = dataset_small;

  const [filters, setFilters] = useState({
    number: [],
    mod3: [],
    mod4: [],
    mod5: [],
    mod6: [],
  });

  // Filter Data based on selected filters
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

  const filteredData = useMemo(
    () => filterData(dataObj, filters),
    [dataObj, filters]
  );

  const handleFilterChange = (filterName: string, selectedList: any[]) => {
    const filter = selectedList.map((item) => item.value);
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: filter }));
  };

  const handleFilterInteractions = useCallback(() => {
    if (filters.mod3.length > 0) {
      const selectedMod3Values = filters.mod3.map(Number);
      const mod6Options = Array.from(
        new Set(
          dataObj
            .filter((data) => selectedMod3Values.includes(data.mod3))
            .map((data) => data.mod6.toString())
        )
      );
      setFilters((prevFilters) => ({ ...prevFilters, mod6: mod6Options }));
    }
  }, [dataObj, filters.mod3]);

  useEffect(() => {
    handleFilterInteractions();
  }, [filters.mod3, handleFilterInteractions]);

  const getUniqueValues = (property: keyof Data) => {
    const uniqueValuesSet = new Set(dataObj.map((item) => item[property]));
    return Array.from(uniqueValuesSet, (value) => ({ value, display: value }));
  };

  const numbers = useMemo(() => getUniqueValues("number"), [dataObj]);
  const mod3Values = useMemo(() => getUniqueValues("mod3"), [dataObj]);
  const mod4Values = useMemo(() => getUniqueValues("mod4"), [dataObj]);
  const mod5Values = useMemo(() => getUniqueValues("mod5"), [dataObj]);
  const mod6Values = useMemo(
    () =>
      getUniqueValues("mod6").filter((option) =>
        filters.mod6.includes(option.value)
      ),
    [dataObj, filters.mod6]
  );

  return (
    <div>
      <div className="container" style={{ display: "flex", gap: "10px" }}>
        <Multiselect
          options={numbers}
          displayValue="display"
          placeholder="Number"
          selectedValues={filters.number.map((value) => ({
            value,
            display: value,
          }))}
          onSelect={(selectedList) =>
            handleFilterChange("number", selectedList)
          }
          onRemove={(selectedList) =>
            handleFilterChange("number", selectedList)
          }
        />
        <Multiselect
          options={mod3Values}
          displayValue="display"
          placeholder="mod3"
          selectedValues={filters.mod3.map((value) => ({
            value,
            display: value,
          }))}
          onSelect={(selectedList) => handleFilterChange("mod3", selectedList)}
          onRemove={(selectedList) => handleFilterChange("mod3", selectedList)}
        />
        <Multiselect
          options={mod4Values}
          displayValue="display"
          placeholder="mod4"
          selectedValues={filters.mod4.map((value) => ({
            value,
            display: value,
          }))}
          onSelect={(selectedList) => handleFilterChange("mod4", selectedList)}
          onRemove={(selectedList) => handleFilterChange("mod4", selectedList)}
        />
        <Multiselect
          options={mod5Values}
          displayValue="display"
          placeholder="mod5"
          selectedValues={filters.mod5.map((value) => ({
            value,
            display: value,
          }))}
          onSelect={(selectedList) => handleFilterChange("mod5", selectedList)}
          onRemove={(selectedList) => handleFilterChange("mod5", selectedList)}
        />
        <Multiselect
          options={mod6Values}
          displayValue="display"
          placeholder="mod6"
          selectedValues={filters.mod6.map((value) => ({
            value,
            display: value,
          }))}
          onSelect={(selectedList) => handleFilterChange("mod6", selectedList)}
          onRemove={(selectedList) => handleFilterChange("mod6", selectedList)}
        />
      </div>
      <div>
        <Table tableData={filteredData} />
      </div>
    </div>
  );
};

export default Filters;
