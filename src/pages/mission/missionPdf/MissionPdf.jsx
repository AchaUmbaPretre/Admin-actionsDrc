import { Document, PDFViewer, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import config from '../../../config';
import axios from 'axios';
import moment from 'moment';
import logo from '../../../assets/actionssarl.PNG'

const MissionPdf = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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
        fontSize: 10,
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
    });

      useEffect(()=>{

        const fetchData = async ()=> {
            try{
                const {data} = await axios.get(`${DOMAIN}/api/admin/allmission`);
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
                  <View style={styles.imgFlex}>
                    <Image style={styles.img} src={logo} />
                    <Text style={styles.subTitle}>Le {moment().format('DD/MM/YYYY')}</Text>
                  </View>
                    <Text style={styles.title}>Liste des horaires</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCells}>N°</Text>
                            <Text style={styles.tableCell}>Client</Text>
                            <Text style={styles.tableCell}>Nom</Text>
                            <Text style={styles.tableCell}>Jour</Text>
                            <Text style={styles.tableCell}>Heure de debut</Text>
                            <Text style={styles.tableCell}>Heure de la fin</Text>
                        </View>
                        {Array.isArray(data) &&
                        data.map((row, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCells}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{row.company_name}</Text>
                                <Text style={styles.tableCell}>{row.first_name}</Text>
                                <Text style={styles.tableCell}>{row.days}</Text>
                                <Text style={styles.tableCell}>{row.heureEntrant.substring(0, 5)}</Text>
                                <Text style={styles.tableCell}>{row.heureSortant.substring(0, 5)}</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    </>
  )
}

export default MissionPdf