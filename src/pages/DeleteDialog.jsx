import React from 'react'
import { Box, Dialog, DialogTitle, IconButton, DialogContent, Typography, DialogActions, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

function DeleteDialog({ open, onClose, action }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: "10px",
          minWidth: "400px",
          maxWidth: "400px"
        },
      }}>

      <Box display="flex" justifyContent="space-between">
        <Box></Box>
        {/* <DialogTitle variant='h5' fontWeight="bold">Delete This User?</DialogTitle> */}
        <IconButton onClick={onClose} sx={{ "&:hover": { backgroundColor: "#ffffff" } }}>
          <CancelIcon sx={{ fontSize: '26px', color: "red", mr: 1, "&:hover": { color: "red" } }} />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" justifyContent="center" p={1}>
          <Typography variant='h5' fontWeight="bold">Delete This Product?</Typography>

        </Box>
        <Box display="flex" justifyContent="center">
          You won't be able to revert this!
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Button
          onClick={() => { action(); onClose() }}
          variant='contained'
          sx={{
            mx: 1, width: '110px', height: '36px', fontSize: 14, fontWeight: 'bold',
            borderRadius: "6px", textTransform: "capitalize",
            backgroundColor: "red", color: "pink",
            "&:hover": {
              backgroundColor: "red",
            }
          }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog