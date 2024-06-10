import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
};

export default function DeleteModal({ open, setOpen, handleDelete }) {

    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ fontSize: 18, textAlign: 'center', fontWeight: 600 }}
            component="h4"
          >
            {`Are you sure you want to delete the data?`}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 6, display: 'flex', justifyContent: 'space-between' }}
          >
            <Button
              onClick={handleDelete}
              variant="contained"
              sx={{ padding: theme => theme.spacing(1.75, 5.5), width: '45%' }}
            >
              Yes
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              sx={{
                padding: theme => theme.spacing(1.75, 5.5),
                width: '45%',
                backgroundColor: '#901F2F',
                color: 'white',
                '&:hover': { backgroundColor: 'error.dark' },
              }}
            >
              No
            </Button>
          </Typography>
        </Box>
      </Modal>
    )
}
