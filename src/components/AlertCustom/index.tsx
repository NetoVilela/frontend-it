// React and hooks
import { useEffect, useState } from "react";

// Components
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";

// Types
interface IAlert {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttonLabel: string;
}

const AlertCustom = ({ open, title, onClose, buttonLabel, message }: IAlert) => {
  return (
    <Dialog onClose={onClose} open={open} BackdropProps={{ onClick: onClose }}>
      <Grid container width="300px">
        <Grid item xs={12}>
          <DialogTitle>
            <Typography variant="h4">{title}</Typography>
          </DialogTitle>
          <DialogContent dividers>
            <Typography>
              {message}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => onClose()}
              color="secondary"
              autoFocus
              variant="contained"
            >
              {buttonLabel}
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default AlertCustom;
