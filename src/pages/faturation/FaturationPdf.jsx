import { Document, PDFViewer, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import moment from 'moment';


const FaturationPdf = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const spinnerDuration = 2000;

    const styles = StyleSheet.create({
        page: {
          fontFamily: 'Helvetica',
          padding: 10,
          flex: 1,
        },
        title: {
          fontSize: 14,
          marginBottom: 20,
          textAlign: "center"
        },
        table: {
          width: '100%',
          marginBottom: 10,
          borderCollapse: 'collapse',
        },
        tableHeader: {
          backgroundColor: '#f2f2f2',
          fontWeight: 200,
          fontSize: 12,
          padding: 5,
        },
        tableRow: {
          flexDirection: 'row',
        },
        tableCell: {
          padding: 10,
          width: 100,
          fontWeight: 200,
          fontSize: 10,
          width: '100%',
        },
        tableCells: {
            padding: 10,
            fontWeight: 200,
            fontSize: 11,
            width: '40%',
          },
      });

  return (
    <div>
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page style={styles.page}>
                    <Text style={styles.title}>Liste des Factures</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCells}>N°</Text>
                            <Text style={styles.tableCell}>Client</Text>
                            <Text style={styles.tableCell}>Date Facture</Text>
                            <Text style={styles.tableCell}>Date D'écheance</Text>
                            <Text style={styles.tableCell}>Montant</Text>
                            <Text style={styles.tableCell}>Status</Text>
                        </View>
                        {Array.isArray(data) &&
                        data.map((row, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCells}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{row.company_name}</Text>
                                <Text style={styles.tableCell}>{row.invoice_date}</Text>
                                <Text style={styles.tableCell}>{row.due_date}</Text>
                                <Text style={styles.tableCell}>{row.total_amount}</Text>
                                <Text style={styles.tableCell}>{row.status}</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    </div>
  )
}

export default FaturationPdf