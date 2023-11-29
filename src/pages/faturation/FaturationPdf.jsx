import { Document, PDFViewer, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import moment from 'moment';
import logo from '../../assets/actionssarl.PNG'


const FaturationPdf = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);
    const spinnerDuration = 2000;

    
    const styles = StyleSheet.create({
      page: {
        fontFamily: 'Helvetica',
        padding: 20,
      },
      imgFlex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20,
      },
      img: {
        width: '9%',
      },
      subTitle: {
        fontSize: 11,
        marginBottom: 10,
        textAlign: 'right',
      },
      title: {
        fontSize: 15,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        textDecoration: 'underline',
      },
      table: {
        width: '100%',
        marginBottom: 10,
        borderCollapse: 'collapse',
      },
      tableHeader: {
        backgroundColor: '#f2f2f2',
        fontSize: 11,
        padding: 3,
        fontWeight: 'bold',
      },
      tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#c5c5c5',
        borderBottomStyle: 'solid',
      },
      tableCell: {
        padding: 10,
        flex: 1,
        fontSize: 8,
        textAlign: 'center'
      },
      tableCells: {
        padding: 8,
        fontSize: 8,
      },
      textTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right',
        fontStyle: 'italic',
      },
    })

    useEffect(()=>{
      const fetchData = async ()=> {
          try{
              const {data} = await axios.get(`${DOMAIN}/api/admin/factureAll`);
              setData(data)
              setLoading(false)
            }catch(error){
              console.log(error)
            };
      }
      fetchData()
    }, [])

    console.log(data)

  return (
    <div>
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page style={styles.page}>
                  <View style={styles.imgFlex}>
                      <Image style={styles.img} src={logo} />
                      <Text style={styles.subTitle}>Le {moment().format('DD/MM/YYYY')}</Text>
                    </View>
                    <Text style={styles.title}>Liste des Factures</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCells}>N°</Text>
                            <Text style={styles.tableCell}>Client</Text>
                            <Text style={styles.tableCell}>Date de la facure</Text>
                            <Text style={styles.tableCell}>Montant</Text>
                            <Text style={styles.tableCell}>Status</Text>
                        </View>
                        {Array.isArray(data) &&
                        data.map((row, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCells}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{row.company_name}</Text>
                                <Text style={styles.tableCell}>{moment(row?.created_at).format('DD/MM/YYYY')}</Text>
                                <Text style={styles.tableCell}>{row.total_amount} $</Text>
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