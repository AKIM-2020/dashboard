import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

export const FilterPopup = ({ open, setOpen }) => {
    return <Dialog open={ open } onClose={ () => setOpen(false) } aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Filters</DialogTitle>
        <DialogContent>
            <DialogContentText>
                TODO add all filters
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={ () => setOpen(false) } color="primary">
                Cancel
            </Button>
            <Button onClick={ () => setOpen(false) } color="primary">
                Apply filters
            </Button>
        </DialogActions>
    </Dialog>
}