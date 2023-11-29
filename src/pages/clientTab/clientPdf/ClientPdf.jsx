import { Document, PDFViewer, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import config from '../../../config';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/actionssarl.PNG'
import { styled } from '@mui/styles';
import { Style } from '@mui/icons-material';
import BarReturn from '../../../components/barReturn/BarReturn';

const ClientPdf = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN

    const navigate = useNavigate();
    const [data, setData] = useState({});
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
      imgRow :{
        display : "flex",
        flexDirection: "column",
        gap: "5px"
      },
      img: {
        width: '30%',
      },
      subTitleLogo: {
        fontSize : 8,
        fontWeight: "medium"
      },
      subTitle: {
        fontSize: 11,
        marginBottom: 10,
        textAlign: 'right',
      },
      title: {
        fontSize: 16,
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
        fontSize: 10,
      },
      textTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'right',
        fontStyle: 'italic',
      },
    })
  


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
        <BarReturn/>
        <PDFViewer style={{ width: '100%', height: '90vh' }}>
            <Document>
                <Page style={styles.page}>
                <View style={styles.imgFlex}>
                  <View style={styles.imgRow}>
                    <Image style={styles.img} src={logo} />
                    <Text style={styles.subTitleLogo}>Republique Démocratique du Congo</Text>
                  </View>
                  <Text style={styles.subTitle}>Le {moment().format('DD/MM/YYYY')}</Text>
                </View>
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