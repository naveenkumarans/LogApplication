import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import styled from '@emotion/styled';

const FormContainer = styled.div`
  width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AddLogForm = ({ onAddLog }) => {
  const [logForm, setLogForm] = useState({
    level: '',
    message: '',
    resourceId: '',
    timestamp: '',
    traceId: '',
    spanId: '',
    commit: '',
    metadata: {
      parentResourceId: '',
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleInputChange = (field, value) => {
    setLogForm({ ...logForm, [field]: value });
  };

  const handleMetadataChange = (field, value) => {
    setLogForm({
      ...logForm,
      metadata: {
        ...logForm.metadata,
        [field]: value,
      },
    });
  };

  const handleAddLog = async () => {
    try {
      console.log('Before log addition:', logForm);
      if (!validateForm()) {
    
        return;
      }
   
      await onAddLog(logForm);
      console.log('After log addition:', logForm);
      alert('Log added successfully!');
  

      resetForm();
    } catch (error) {
      console.error(error);
  
      alert('An error occurred while adding the log. Please try again.');
    }
  };
  
  
  const validateForm = () => {
    const isFormValid =
      logForm.level.trim() !== '' &&
      logForm.message.trim() !== '' &&
      logForm.resourceId.trim() !== '' &&
      logForm.timestamp.trim() !== '' &&
      logForm.traceId.trim() !== '' &&
      logForm.spanId.trim() !== '' &&
      logForm.commit.trim() !== '' &&
      logForm.metadata.parentResourceId.trim() !== '';

    if (!isFormValid) {
      setOpenSnackbar({
        open: true,
        message: 'Please fill in all required fields.',
        severity: 'error',
      });
    }

    return isFormValid;
  };

  const resetForm = () => {
    setLogForm({
      level: '',
      message: '',
      resourceId: '',
      timestamp: '',
      traceId: '',
      spanId: '',
      commit: '',
      metadata: {
        parentResourceId: '',
      },
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar({
      open: false,
      message: '',
      severity: 'success',
    });
  };

  return (
    <FormContainer>
      <h2>Add Log</h2>
      <TextField
        label="Level"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={logForm.level}
        onChange={(e) => handleInputChange('level', e.target.value)}
      />
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={logForm.message}
        onChange={(e) => handleInputChange('message', e.target.value)}
      />
      <TextField
        label="Resource ID"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={logForm.resourceId}
        onChange={(e) => handleInputChange('resourceId', e.target.value)}
      />
      <TextField
        label="Timestamp"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={logForm.timestamp}
        onChange={(e) => handleInputChange('timestamp', e.target.value)}
      />
      <TextField
        label="Trace ID"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={logForm.traceId}
        onChange={(e) => handleInputChange('traceId', e.target.value)}
      />
      <TextField
        label="Span ID"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={logForm.spanId}
        onChange={(e) => handleInputChange('spanId', e.target.value)}
      />
      <TextField
        label="Commit"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={logForm.commit}
        onChange={(e) => handleInputChange('commit', e.target.value)}
      />
      <TextField
        label="Parent Resource ID"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={logForm.metadata.parentResourceId}
        onChange={(e) => handleMetadataChange('parentResourceId', e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddLog}>
        Add
      </Button>

      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" severity={openSnackbar.severity}>
          {openSnackbar.message}
        </MuiAlert>
      </Snackbar>
    </FormContainer>
  );
};

export default AddLogForm;

