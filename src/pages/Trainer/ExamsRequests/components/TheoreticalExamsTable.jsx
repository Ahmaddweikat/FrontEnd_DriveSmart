import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Tooltip,
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const TheoreticalExamsTable = ({ 
  requests, 
  onApprove, 
  onReject, 
  currentPage, 
  totalPages, 
  handlePageChange,
  activeTab,
  setActiveTab 
}) => {
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    request: null,
    action: null
  });

  const getStatusColor = (successRate) => {
    if (successRate >= 85) return 'bg-green-100 text-green-800';
    if (successRate >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const headerCellStyle = {
    color: 'white',
    fontWeight: 500,
    textAlign: 'center',
    padding: '16px 8px'
  };

  const bodyCellStyle = {
    textAlign: 'center',
    padding: '16px 8px'
  };

  const handleAction = (request, action) => {
    setConfirmDialog({
      open: true,
      request,
      action
    });
  };

  const handleConfirm = () => {
    const { request, action } = confirmDialog;
    if (action === 'approve') {
      onApprove(request);
    } else {
      onReject(request);
    }
    setConfirmDialog({ open: false, request: null, action: null });
  };

  const handleClose = () => {
    setConfirmDialog({ open: false, request: null, action: null });
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Pending" value="pending" />
          <Tab label="Accepted" value="accepted" />
          <Tab label="Rejected" value="rejected" />
        </Tabs>
      </Box>

      <Paper elevation={2} className="overflow-hidden">
        <TableContainer>
          <Table>
            <TableHead className="bg-customGreen">
              <TableRow>
                <TableCell sx={headerCellStyle}>Student</TableCell>
                <TableCell sx={headerCellStyle}>Success Rate</TableCell>
                <TableCell sx={headerCellStyle}>Email</TableCell>
                <TableCell sx={headerCellStyle}>License Type</TableCell>
                {activeTab === 'pending' && (
                  <TableCell sx={headerCellStyle}>Actions</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center gap-3">
                        <Avatar 
                          src={request.avatar} 
                          alt={request.name}
                        />
                        <span>{request.name}</span>
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.successRate)}`}>
                          {request.successRate}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        {request.email}
                      </div>
                    </TableCell>
                    <TableCell sx={bodyCellStyle}>
                      <div className="flex items-center justify-center">
                        {request.licenseType}
                      </div>
                    </TableCell>
                    {activeTab === 'pending' && (
                      <TableCell sx={bodyCellStyle}>
                        <div className="flex items-center justify-center gap-2">
                          <IconButton
                            onClick={() => handleAction(request, 'approve')}
                            color="success"
                            size="small"
                            title="Approve"
                          >
                            <CheckCircleOutlineIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleAction(request, 'reject')}
                            color="error"
                            size="small"
                            title="Reject"
                          >
                            <CancelOutlinedIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={activeTab === 'pending' ? 5 : 4} 
                    align="center" 
                    sx={{ py: 4 }}
                  >
                    <p className="text-gray-500">No theoretical exam requests available</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {requests.length > 0 && totalPages > 1 && (
          <div className="flex justify-center py-4 bg-white">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                variant="outlined"
                color="primary"
              />
            </Stack>
          </div>
        )}
      </Paper>

      <Dialog open={confirmDialog.open} onClose={handleClose}>
        <DialogTitle>
          {confirmDialog.action === 'approve' ? 'Approve Request' : 'Reject Request'}
        </DialogTitle>
        <DialogContent>
          Are you sure you want to {confirmDialog.action} the theoretical exam request for{' '}
          {confirmDialog.request?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            color={confirmDialog.action === 'approve' ? 'success' : 'error'}
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TheoreticalExamsTable;
