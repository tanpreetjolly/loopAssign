import React from "react";
import DataTable from "react-data-table-component";
import data from "../data/dataset_small.json";

interface DataItem {
  number: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
}

interface ColumnType {
  name: string;
  selector: (row: DataItem) => number | string;
  sortable: boolean;
}

const columns: ColumnType[] = [
  {
    name: "Number",
    selector: (row) => row.number,
    sortable: true,
  },
  {
    name: "Mod 3",
    selector: (row) => row.mod3,
    sortable: true,
  },
  {
    name: "Mod 4",
    selector: (row) => row.mod4,
    sortable: true,
  },
  {
    name: "Mod 5",
    selector: (row) => row.mod5,
    sortable: true,
  },
  {
    name: "Mod 6",
    selector: (row) => row.mod6,
    sortable: true,
  },
];

const paginationOptions = {
  rowsPerPageText: "Rows per page:",
  rangeSeparatorText: "of",
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const DataTableComponent: React.FC = () => {
  const tableData: DataItem[] = data;
  return (
    <div>
      <DataTable
        columns={columns}
        data={tableData}
        pagination
        paginationPerPage={100}
        paginationRowsPerPageOptions={[100]}
        paginationComponentOptions={paginationOptions}
        paginationTotalRows={tableData.length}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        responsive  
      />
    </div>
  );
};

export default DataTableComponent;
