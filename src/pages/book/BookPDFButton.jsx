import React from "react";
import Button from "@mui/material/Button";
import { saveAs } from "file-saver";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { Typography } from "@mui/material";
import { Font } from "@react-pdf/renderer";

// Register the font
Font.register({
  family: "Noto Sans",
  src: "/fonts/NotoSans-Regular.ttf",
  format: "truetype",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: "10",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontFamily: "Noto Sans", // ✅ Set font family
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
    width: "20%", // Each cell should take up around 1/7th of the table width
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#3f51b5", // Background color for table header
    color: "white", // Text color for table header
  },
  tableCell: {
    fontSize: 12,
    padding: 5,
    width: "20%", // Each cell should take up around 1/7th of the table width
    borderStyle: "solid",
    borderRightWidth: 1,
    backgroundColor: "#ffffff", // Background color for table cell
    fontFamily: "Noto Sans", // ✅ Apply font to table cells
  },
  footer: {
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
  },
});

const formatDateTime = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

const MyDocument = ({ data, generatedOn }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <Text style={{ ...styles.title, fontFamily: "Noto Sans" }}>
        Cartile filtrate din librarie
      </Text>
      <View style={styles.section}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableHeader, fontFamily: "Noto Sans" }}>
              Codul ISBN
            </Text>
            <Text style={{ ...styles.tableHeader, fontFamily: "Noto Sans" }}>
              Titlu
            </Text>
            <Text style={{ ...styles.tableHeader, fontFamily: "Noto Sans" }}>
              Autori
            </Text>
            <Text style={{ ...styles.tableHeader, fontFamily: "Noto Sans" }}>
              Gen
            </Text>
            <Text style={{ ...styles.tableHeader, fontFamily: "Noto Sans" }}>
              An aparitie
            </Text>
            <Text style={{ ...styles.tableHeader, fontFamily: "Noto Sans" }}>
              Descriere
            </Text>
          </View>
          {/* Table Body */}
          {data.map((book, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{book.isbn}</Text>
              <Text style={styles.tableCell}>{book.title}</Text>
              <Text style={styles.tableCell}>{book.authors}</Text>
              <Text style={styles.tableCell}>{book.types}</Text>
              <Text style={styles.tableCell}>{book.year}</Text>
              <Text style={styles.tableCell}>{book.description}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={{ ...styles.footer, fontFamily: "Noto Sans" }}>
        Generated on: {generatedOn}
      </Text>
    </Page>
  </Document>
);

const BookPDFButton = ({ getFilteredBooks }) => {
  const handleGeneratePDF = () => {
    const generatedOn = formatDateTime(new Date());
    const pdfContent = (
      <MyDocument data={getFilteredBooks()} generatedOn={generatedOn} />
    );

    // Convert the react-pdf component to blob
    pdf(pdfContent)
      .toBlob()
      .then((blob) => {
        // Save the blob as a PDF file
        saveAs(blob, "carti_filtrate.pdf");
      });
  };

  return (
    <div>
      <Typography variant="body2" sx={{ marginTop: 2, marginBottom: 2 }}>
        <Button
          variant="contained"
          onClick={handleGeneratePDF}
          sx={{
            fontSize: "13px", // Set the font size to smaller
            whiteSpace: "normal", // Allow text to wrap onto two lines
            height: "auto", // Adjust height to fit the content
            backgroundColor: "#1C7343",
            "&:hover": {
              backgroundColor: "#155e36", // Darker green on hover
              borderColor: "#155e36", // Darker border color on hover
            },
          }}
        >
          Descarca PDF cu
          <br />
          Cartile filtrate
        </Button>
      </Typography>
    </div>
  );
};

export default BookPDFButton;
