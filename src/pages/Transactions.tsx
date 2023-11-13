import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  GridValidRowModel,
} from "@mui/x-data-grid";
import {
  randomArrayItem,
  randomCommodity,
  randomCreatedDate,
  randomId,
  randomInt,
} from "@mui/x-data-grid-generator";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { CustomNoRowsOverlay } from "../components/NoRowsOverlay";
import { db } from "../config/Firebase";

const categories = ["Housing", "Living", "Internet", "Side Hustle", "Round"];
const account = ["Hot Wallet", "Cold Wallet", "Lobola"];
const type = ["Income", "Expenses"];

const randomCategory = () => {
  return randomArrayItem(categories);
};
const randomAccount = () => {
  return randomArrayItem(account);
};

const randomType = () => {
  return randomArrayItem(type);
};

const generateRandomRow = () => ({
  id: randomId(),
  title: randomCommodity(),
  comment: randomCommodity(),
  date: randomCreatedDate(),
  type: randomType(),
  category: randomCategory(),
  amount: randomInt(10, 1000),
  account: randomAccount(),
});

const generateInitialRows = (rowCount: number): GridRowsProp => {
  const rows: GridValidRowModel[] = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push(generateRandomRow());
  }
  return rows;
};

const initialRows: GridRowsProp = generateInitialRows(30);

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      {
        id,
        title: "",
        comment: "",
        date: new Date(),
        amount: "",
        type: "",
        category: "",
        account: "",
        isNew: true,
      },
      ...oldRows,
    ]);

    setRowModesModel((oldModel) => ({
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
      ...oldModel,
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Transaction
      </Button>
    </GridToolbarContainer>
  );
}

type Transaction = {
  id: string;
  title: string;
  comment: string;
  date: string;
  type: string;
  category: string;
  amount: number;
  account: string;
  isNew?: boolean;
};

export default function Transactions() {
  const [rows, setRows] = useState<Transaction[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const [isLoading, setIsLoading] = useState(true);
  const getTransactions = useCallback(async (): Promise<void> => {
    const transactionsCollectionRef = collection(db, "transactions");
    try {
      const data = await getDocs(transactionsCollectionRef);
      const transactions: Transaction[] = data.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          title: docData.title,
          comment: docData.comment,
          date: docData.date.toDate(),
          type: docData.type,
          category: docData.category,
          amount: docData.amount,
          account: docData.account,
        };
      });

      setRows(transactions);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect ran");
    getTransactions();
  }, []);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    setRows(rows.filter((row) => row.id !== id));
    const transactionDoc = doc(db, "transactions", id.toString());
    console.log(transactionDoc);
    await deleteDoc(transactionDoc);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: Transaction) => {
    const updatedRow = {
      ...newRow,
      isNew: false,
    };

    const transactionDoc = doc(db, "transactions", newRow.id);
    await setDoc(transactionDoc, updatedRow);

    console.log(updatedRow);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 80,
      flex: 1,
      editable: true,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      flex: 1,
      editable: true,
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 200,
      flex: 2,
      editable: true,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 180,
      flex: 1,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      editable: true,
      width: 220,
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Housing", "Living", "Internet", "Side Hustle", "Round"],
    },
    {
      field: "type",
      headerName: "Type",
      editable: true,
      width: 220,
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Income", "Expenses"],
    },
    {
      field: "account",
      headerName: "Account",
      width: 220,
      editable: true,
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Hot Wallet", "Cold Wallet", "Lobola"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
      className="p-5 w-[100vw] h-[calc(100vh-14vh)]"
    >
      <DataGrid
        loading={isLoading}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        density="standard"
        processRowUpdate={processRowUpdate}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: "date", sort: "desc" }] },
        }}
        pageSizeOptions={[10]}
        slots={{
          toolbar: EditToolbar,
          loadingOverlay: LinearProgress,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
