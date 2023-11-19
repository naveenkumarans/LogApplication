import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import styled from '@emotion/styled';
import AddLogForm from './AddLogForm';

const LogListContainer = styled.div`
  background-color: white;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FilterSearchForm = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const LogTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCategoryValue, setFilterCategoryValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [startTimestamp, setStartTimestamp] = useState('');
  const [endTimestamp, setEndTimestamp] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddLogForm, setShowAddLogForm] = useState(false);
  const [deleteLogId, setDeleteLogId] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, [filterCategory, filterCategoryValue, searchQuery, startTimestamp, endTimestamp]);

  const fetchLogs = async () => {
    try {
      setLoading(true);

      let url = 'http://localhost:8080/api/v1/logs';

      if (filterCategory && filterCategoryValue) {
        url = `http://localhost:8080/api/v1/${filterCategory}/${encodeURIComponent(filterCategoryValue)}`;
      }

      if (searchQuery) {
        url = `http://localhost:8080/api/v1/search?query=${searchQuery}`;
      }

      if (startTimestamp && endTimestamp) {
        url = `http://localhost:8080/api/v1/by-timestamp/${encodeURIComponent(startTimestamp)}/${encodeURIComponent(endTimestamp)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }

      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setFilterCategory('');
    setFilterCategoryValue('');
    fetchLogs();
  };

  const handleFilterClick = () => {
    setSearchQuery('');
    fetchLogs();
  };

  const handleAddLog = async (logData) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        throw new Error('Failed to add log');
      }

      fetchLogs();

      setShowAddLogForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteLogId(id);
    setOpenConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/log/${deleteLogId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete log');
      }

      fetchLogs();
    } catch (error) {
      console.error(error);
    } finally {
      setOpenConfirmation(false);
      setDeleteLogId(null);
    }
  };

  const handleCancel = () => {
    setOpenConfirmation(false);
    setDeleteLogId(null);
  };

  return (
    <LogListContainer>
      <h2>Log List</h2>
      <FilterSearchForm>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select
          label="Filter by Category"
          variant="outlined"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="level">Level</MenuItem>
          <MenuItem value="message">Message</MenuItem>
          <MenuItem value="resourceId">Resource ID</MenuItem>
          <MenuItem value="timestamp">Timestamp</MenuItem>
          <MenuItem value="traceId">Trace ID</MenuItem>
          <MenuItem value="spanId">Span ID</MenuItem>
          <MenuItem value="commit">Commit</MenuItem>
        </Select>
        <TextField
          label={`Filter by ${filterCategory}`}
          variant="outlined"
          value={filterCategoryValue}
          onChange={(e) => setFilterCategoryValue(e.target.value)}
        />

        <TextField
          variant="outlined"
          type="datetime-local"
          value={startTimestamp}
          onChange={(e) => setStartTimestamp(e.target.value)}
        />
        <TextField
          variant="outlined"
          type="datetime-local"
          value={endTimestamp}
          onChange={(e) => setEndTimestamp(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearchClick}>
          Search by Timestamp
        </Button>
        <Button variant="contained" color="primary" onClick={handleFilterClick}>
          Filter
        </Button>
      </FilterSearchForm>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddLogForm(!showAddLogForm)}
      >
        {showAddLogForm ? 'Cancel' : 'Add Log'}
      </Button>

      {showAddLogForm && <AddLogForm onAddLog={handleAddLog} />}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <LogTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Level</th>
              <th>Message</th>
              <th>Resource ID</th>
              <th>Timestamp</th>
              <th>Trace ID</th>
              <th>Span ID</th>
              <th>Commit</th>
              <th>Metadata</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="10">Sorry, no logs found.</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.level}</td>
                  <td>{log.message}</td>
                  <td>{log.resourceId}</td>
                  <td>{log.timestamp}</td>
                  <td>{log.traceId}</td>
                  <td>{log.spanId}</td>
                  <td>{log.commit}</td>
                  <td>
                    <ul>
                      {Object.entries(log.metadata).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <Button
                      variant="outlined"
                      color="secondary"
                      backgroundColor="red"
                      onClick={() => handleDeleteClick(log.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </LogTable>
      )}

      <Dialog open={openConfirmation} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </LogListContainer>
  );
};

export default LogList;
