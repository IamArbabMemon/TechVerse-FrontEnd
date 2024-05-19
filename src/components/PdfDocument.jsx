import React, { Fragment, useState } from "react";
import { Avatar, Box, Button, Dialog, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  tableRow: {
    padding: '5px',
    backgroundColor: "#F2F2F2",
  },
  tableHead: {
    padding: 10,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
    color: "#FFFFFF",
  },
  tableCell: {
    padding: '5px',
    fontSize: 11,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
  },
});

const PdfDocument = ({ open, onClose, data }) => {

  const [userData, setUserData] = useState("");

  const [ordersData, setOrdersData] = useState([]);


  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': { minWidth: '900px', maxWidth: '1100px' }
      }}
    >
      <PDFViewer style={{ width: "100%", height: "800px" }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={{ paddingTop: 30, paddingBottom: 20, paddingLeft: 40, paddingRight: 40 }}>
              <View>
                <Text style={{ fontSize: 28, fontWeight: "bold" }}>{userData?.name}</Text>
                <Text style={{ fontSize: 12, color: "#FAFAFA", width: "300px" }}>{userData?.address}</Text>
              </View>
            </View>

            <View style={{ display: "flex", height: "28px", backgroundColor: "#FFC809" }}>
              <View style={{ fontSize: 30, paddingLeft: 10, paddingRight: 10, position: "absolute", right: 90, backgroundColor: "#E4E4E4" }}>
                <Text>INVOICE</Text>
              </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ paddingTop: 15, paddingBottom: 20, paddingLeft: 40, paddingRight: 40 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 1 }}>Invoice to:</Text>
                <Text style={{ marginTop: 4, marginBottom: 1, fontSize: 16, fontWeight: "bold" }}>{ordersData?.client_name}</Text>
                <Text style={{ marginBottom: 1, fontSize: 12, fontWeight: "bold", color: "#FAFAFA", width: "150px" }}>{ordersData?.client_address}</Text>
                <Text style={{ marginBottom: 1, fontSize: 12, fontWeight: "bold", color: "#FAFAFA" }}>{ordersData?.client_phone}</Text>
              </View>

              <View style={{ width: "40%", paddingTop: 15, paddingBottom: 20, paddingLeft: 40, paddingRight: 40 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 25 }}>
                  <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 1 }}>Invoice #</Text>
                  <Text style={{ marginBottom: 8, fontSize: 12, color: "#FAFAFA" }}>{ordersData?.order_no}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 1 }}>Order Date</Text>
                  <Text style={{ marginBottom: 8, fontSize: 12, color: "#FAFAFA" }}>12/2/23</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>Delivery Date</Text>
                  <Text style={{ marginBottom: 8, fontSize: 12, color: "#FAFAFA" }}>12/2/23</Text>
                </View>
              </View>
            </View>

            {/* For Table */}
            <View
              style={{
                width: "100%",
                position: "relative",
                marginTop: 16,
                paddingTop: 30,
                paddingBottom: 20,
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              <View style={{ border: "1px solid black" }}>
                <View style={{ backgroundColor: "#373B46", flexDirection: "row" }}>
                  <Text style={{ ...styles.tableHead, width: '30px' }}>#</Text>
                  <Text style={{ ...styles.tableHead, width: '100px' }}>Category</Text>
                  <Text style={{ ...styles.tableHead, width: '150px' }}>Name</Text>
                  {/* <Text style={{ ...styles.tableHead, width: '80px' }}>Size</Text> */}
                  <Text style={{ ...styles.tableHead, width: '80px' }}>Image</Text>
                  <Text style={{ ...styles.tableHead, width: '80px' }}>Qty</Text>
                  <Text style={{ ...styles.tableHead, width: '80px' }}>Unit Price</Text>
                  {/* <Text style={{ ...styles.tableHead, width: '80px' }}>Total</Text> */}
                </View>
                {data?.map((item, index) => (
                  <View key={index} style={[index % 2 !== 1 ? styles.tableCell : styles.tableRow, { flexDirection: "row" }]}>
                    <Text style={{ ...styles.tableCell, width: '30px' }}>{index + 1}</Text>
                    <Text style={{ ...styles.tableCell, width: '100px' }}>{item.category}</Text>
                    <Text style={{ ...styles.tableCell, width: '150px' }}>{item.item}</Text>
                    {/* <Text style={{ ...styles.tableCell, width: '80px' }}>{item?.size ? <Text>{item?.size}</Text> : <Text>--</Text>}</Text> */}
                    <Text style={{ ...styles.tableCell, width: '80px' }}>{item?.image ? <Text>--</Text> : <Text>--</Text>}</Text>
                    <Text style={{ ...styles.tableCell, width: '80px' }}>{item.qty}</Text>
                    <Text style={{ ...styles.tableCell, width: '80px' }}>{item.price}</Text>
                    {/* <Text style={{ ...styles.tableCell, width: '80px' }}>{item.row_total}</Text> */}
                  </View>
                ))}
              </View>
            </View>
            {/* For Summary */}

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 15, paddingBottom: 20, paddingLeft: 40, paddingRight: 40 }}>
              <View style={{}}>
                <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: "16px" }}>Thank you For Your Business</Text>
              </View>
              <View style={{ width: "180px" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                  <Text style={{ fontSize: 12 }}>SubTotal</Text>
                  <Text style={{ color: "#FAFAFA", fontSize: 10 }}>AED {ordersData?.sub_total}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                  <Text style={{ fontSize: 12 }}>Vat</Text>
                  <Text style={{ color: "#FAFAFA", fontSize: 10 }}>AED 5%</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                  <Text style={{ fontSize: 12 }}>Total</Text>
                  <Text style={{ color: "#FAFAFA", fontSize: 10 }}>AED {ordersData?.total}</Text>
                </View>
                <View style={{ padding: '5px', marginBottom: "10px", backgroundColor: "#FFC809" }}>
                  <Text style={{ fontSize: 14, fontWeight: 700 }}>GrandTotal</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                  <Text style={{ fontSize: 12 }}>Advance-In-Paid</Text>
                  <Text style={{ color: "#FAFAFA", fontSize: 10 }}>AED {ordersData?.advance_in_paid}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "10px" }}>
                  <Text style={{ fontSize: 12 }}>Balance</Text>
                  <Text style={{ color: "#FAFAFA", fontSize: 10 }}>AED {ordersData?.balance}</Text>
                </View>
              </View>
            </View>

            {/* Footer Section */}
            <View style={[styles.footer, { paddingLeft: 40, paddingRight: 40 }]}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ paddingLeft: 10, marginBottom: 1, fontWeight: "bold", color: "#FAFAFA", fontSize: 10 }}>Phone #</Text>
                <Text style={{ marginBottom: 1, fontSize: 12 }}>{userData?.phone}</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ marginBottom: 1, fontWeight: "bold", color: "#FAFAFA", fontSize: 10 }}>Email:</Text>
                <Text style={{ marginBottom: 1, fontSize: 10 }}>{userData?.email}</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ marginBottom: 1, fontWeight: "bold", color: "#FAFAFA", fontSize: 10 }}>Website:</Text>
                <Text style={{ marginBottom: 1, fontSize: 10 }}>{userData?.website}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Dialog>
  );
};

export default PdfDocument;
