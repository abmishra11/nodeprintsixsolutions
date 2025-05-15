import React, { useState } from "react";
import { Box, TextField, Button, Chip, Stack, IconButton } from "@mui/material";
import { Add, Close } from "@mui/icons-material";

interface ArrayItemsInputProps {
  items: string[];
  setItems: (items: string[]) => void;
  itemTitle: string;
}

const ArrayItemsInput: React.FC<ArrayItemsInputProps> = ({ items, setItems, itemTitle }) => {
  const [item, setItem] = useState<string>("");
  const [showTagForm, setShowTagForm] = useState<boolean>(false);

  const addItem = () => {
    if (!item) return;
    if (!items.includes(item)) {
      setItems([...items, item]);
      setItem(""); // clear input
    } else {
      alert(`${itemTitle} already added`);
    }
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <Box className="col-12 mt-3">
      {showTagForm ? (
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label={`Create a ${itemTitle}`}
            variant="outlined"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            size="small"
          />
          <Button
            variant="contained"
            color="success"
            onClick={addItem}
            startIcon={<Add />}
          >
            Add
          </Button>
          <IconButton color="error" onClick={() => setShowTagForm(false)}>
            <Close />
          </IconButton>
        </Stack>
      ) : (
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setShowTagForm(true)}
          className="mt-2"
        >
          Add {itemTitle}
        </Button>
      )}

      <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
        {items.map((value, i) => (
          <Chip
            key={i}
            label={value}
            onDelete={() => removeItem(i)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ArrayItemsInput;
