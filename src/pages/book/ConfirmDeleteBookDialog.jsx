import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";

//isOpen, handleClose, onDelete => props
const ConfirmDeleteBookDialog = ({ book, isOpen, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirmi stergerea?</DialogTitle>
      <DialogContent>
        <Typography>{`Esti sigur ca vrei sa stergi acesta carte:`}</Typography>
        <Typography sx={{ fontWeight: "bold" }}>{book.title}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteBookDialog;
