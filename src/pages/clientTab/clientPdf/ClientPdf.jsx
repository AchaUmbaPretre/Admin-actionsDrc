import { Document, PDFViewer, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import config from '../../../config';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ClientPdf = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN

    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

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


    useEffect(()=>{
    
        const fetchData = async ()=> {
          try{
              const {data} = await axios.get(`${DOMAIN}/api/admin/client`);
              setData(data)
              setLoading(false);
      
            }catch(error){
              console.log(error)
            };
      }
      fetchData()
      }, [])

  return (
    <>
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page style={styles.page}>
                    <Text style={styles.title}>Liste des clients</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCells}>N°</Text>
                            <Text style={styles.tableCell}>Client</Text>
                            <Text style={styles.tableCell}>Adresse</Text>
                            <Text style={styles.tableCell}>Tel compagnie</Text>
                            <Text style={styles.tableCell}>RCCM</Text>
                            <Text style={styles.tableCell}>ID nate</Text>
                            <Text style={styles.tableCell}>Province</Text>
                        </View>
                        {Array.isArray(data) &&
                        data.map((row, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCells}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{row.company_name}</Text>
                                <Text style={styles.tableCell}>{row.address}</Text>
                                <Text style={styles.tableCell}>{row.contact_phone}</Text>
                                <Text style={styles.tableCell}>{row.rccm}</Text>
                                <Text style={styles.tableCell}>{row.idnate}</Text>
                                <Text style={styles.tableCell}>{row.province}</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    </>
  )
}

export default ClientPdf