import * as React from 'react';
import { Box, Card, CardContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import {ViewCozyTwoTone,AspectRatio, CancelPresentation, DataSaverOff, Equalizer} from "@mui/icons-material";
import ConfirmationDialog from './ConfirmationDialog';
import { ErrorToaster, SuccessToaster } from './Toaster';
import { useState } from 'react';
import PdfDocument from './PdfDocument';



const Orders = () => {
  const user = localStorage.getItem('accountNumber');
  const role = localStorage.getItem('role');
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showPDF, setShowPDF] = useState(false);
  const [pdfDialog, setPdfDialog] = useState(false);

  const handleInvoice = () => {
    setShowPDF(true);
    setPdfDialog(!pdfDialog);
  };

  const fetchData = async () => {
    try {
      let apiUrl;
  if(role==="wholeseller"){
    apiUrl = `http://localhost:3001/orders/getWholeSellerOrderHistory/${user}`
  }
  else{
    apiUrl = `http://localhost:3001/orders/getUserOrderHistory/${user}`
  }
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOrders(data);
      // console.log(allProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchRecord = async () => {
    try {
      let apiUrl;
  if(role==="wholeseller"){
    apiUrl = `http://localhost:3001/wholeSellerAccount/getAccountDetails/${user}`
  }
  else{
    apiUrl = `http://localhost:3001/userAccount/getAccountDetails/${user}`
  }
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDetails(data);
      // console.log(allProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteUser = async () => {
    try {
      let apiUrl;
      if(role==="wholeseller"){
        apiUrl = `http://localhost:3001/orders/orderDelivered/${orderId}`
      }
      else{
        apiUrl = `http://localhost:3001/orders/cancelOrder/${orderId}`
      }   
      const response = await fetch(apiUrl,{
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type if needed
        }
      });
      if (response?.status === 200) {
        if(role==="wholeseller"){
          SuccessToaster("Status Updated")
          fetchData();
        }else{
          console.log("else Call")
          SuccessToaster("Order Cancel")
          fetchData();
        }
        
      }
    } catch (error) {
      ErrorToaster(error)
    }
  }

  React.useEffect(() => {
    fetchData();
    fetchRecord();
  }, []);

  return (
    <div style={{ height: 550, width: '100%' }}>
      {showPDF && <PdfDocument open={pdfDialog} onClose={() => setPdfDialog(false)} data={orders}/>}
      <ConfirmationDialog open={confirmDialog} onClose={() => setConfirmDialog(false)} action={deleteUser} role={role} />
      <Box sx={{display:"flex", justifyContent: "space-evenly", pb:2}}>
        <Card display="flex" sx={{minWidth:"400px", borderRadius: "6px", boxShadow: `0px 1px 2px 2px #8D8D8D29 ` }} >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 1 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", pt: 2.5, px: 1.5 }}>
            <Typography fontFamily="Public Sans, sans-serif" fontSize="1rem" fontWeight="700" color="rgb(99, 115, 129)">
            {role==="wholeseller"?("Total Sell"):("Total Profit")}
            </Typography>
            <Typography fontFamily="Public Sans, sans-serif" fontSize="2rem" fontWeight="700">
              {role==="wholeseller"?(details.totalSale):(details.totalProfit)}
              <span style={{ fontSize: "13px" }}>PKR</span>
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center">
              <Equalizer sx={{ fontSize: "80px", color:"green" }}/>
            </Box>
          
          </Box>
          </CardContent>
        </Card>
        <Card display="flex" sx={{minWidth:"400px", borderRadius: "6px", boxShadow: `0px 1px 2px 2px #8D8D8D29 ` }} >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 1 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", pt: 2.5, px: 1.5 }}>
            <Typography fontFamily="Public Sans, sans-serif" fontSize="1rem" fontWeight="700" color="rgb(99, 115, 129)">
              Total Orders
            </Typography>
            <Typography fontFamily="Public Sans, sans-serif" fontSize="2rem" fontWeight="700">
              {orders.length}
              {/* <span style={{ fontSize: "13px" }}>Orders</span> */}
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center">
              <DataSaverOff sx={{ fontSize: "80px", color:"lightblue" }}/>
            </Box>
          
          </Box>
          </CardContent>
        </Card>
      </Box>
    <TableContainer component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>order ID</TableCell>
            <TableCell align="right">Order BY</TableCell>
            <TableCell align="right">Profit</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row?._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row?._id}</TableCell>
              <TableCell component="th" scope="row" align="right">{row?.orderedBy}</TableCell>
              <TableCell align="right">{row?.profit}</TableCell>
              <TableCell align="right">
                {row?.customerDetails?.name}
              </TableCell>
              <TableCell align="right">{row?.customerDetails?.phoneNumber}</TableCell>
              <TableCell align="right">{row?.status}</TableCell>
              <TableCell align="right">
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent:"flex-end" }}>
                          {role==="wholeseller" ?(
                              <Tooltip title="Change Status">
                              <IconButton onClick={() => { setOrderId(row._id); setConfirmDialog(true) }}>
                                <ViewCozyTwoTone sx={{ fontSize: "20px", }} />
                              </IconButton>
                            </Tooltip>
                          ):(
                            <Tooltip title="Cancel Order">
                            <IconButton onClick={() => { setOrderId(row._id); setConfirmDialog(true) }}>
                              <CancelPresentation sx={{ fontSize: "20px", color:"#FF0000" }} />
                            </IconButton>
                          </Tooltip>
                          )}
                          <Tooltip title="Invoice">
                            <IconButton onClick={() => handleInvoice()}>
                              <AspectRatio color="secondary" sx={{ fontSize: "20px" }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  )
}

export default Orders