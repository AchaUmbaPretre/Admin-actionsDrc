import { Document, PDFViewer, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';
import moment from 'moment';
import logo from '../../assets/actionssarl.PNG'


const PaiementPdf = () => {
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
          fontSize: 10,
          marginBottom: 10,
          textAlign: 'right',
        },
        title: {
          fontSize: 17,
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
          fontSize: 12,
          padding: 5,
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
          fontSize: 10,
          textAlign: 'center'
        },
        tableCells: {
          padding: 10,
          fontSize: 10,
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
                const res = await axios.get(`${DOMAIN}/api/admin/payement`);
                setData(res.data)
                setLoading(false);
              }catch(error){
                console.log(error)
              };
        }
        fetchData()
     }, [])

  return (
    <div>
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page style={styles.page}>
                    <View style={styles.imgFlex}>
                        <Image style={styles.img} src={logo} />
                        <Text style={styles.subTitle}>Le {moment().format('DD/MM/YYYY')}</Text>
                    </View>
                    <Text style={styles.title}>Liste des Paiements</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCells}>N°</Text>
                            <Text style={styles.tableCell}>Id de facture</Text>
                            <Text style={styles.tableCell}>Date de paiement</Text>
                            <Text style={styles.tableCell}>Montant</Text>
                            <Text style={styles.tableCell}>Méthode de paiement</Text>
                        </View>
                        {Array.isArray(data) &&
                        data.map((row, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCells}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{row.invoice_id}</Text>
                                <Text style={styles.tableCell}>{moment(row.payment_date).format('DD/MM/YYYY')}</Text>
                                <Text style={styles.tableCell}>{row.amount} $</Text>
                                <Text style={styles.tableCell}>{row.methode_paiement}</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    </div>
  )
}

export default PaiementPdf