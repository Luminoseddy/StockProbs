import { StyleSheet, Text, SafeAreaView, Button, View, FlatList } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import DocumentPicker, { types } from 'react-native-document-picker';
import Papa from "papaparse";

const CsvUploadScreen = () => {
    const csvFileUrl = "/Users/eddy/Desktop/miStuff/Code/TextFiles/MSFT.csv";
    
    // This state will store the parsed data
    const [data, setData] = useState([]);
    // It will store the file uploaded by the user
    const [file, setFile] = useState("");
    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");
    

    const handleDocumentSelection = useCallback(async () => {
        try {
            const file = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                type: [types.csv],
                allowMultiSelection: false,
            });
            // console.log("Doc selected")
            if (!file) {
                setError("Only .csv files are accepted.");
            }
            setFile(file);

            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true });
                const parsedData = csv?.data;
                const columns = Object.keys(parsedData[0]);
                setData(columns);
            };
            reader.readAsText(file);
            console.log(file)
            
        } catch (err) {
            console.warn(err);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Button
                title="Select 📑"
                onPress={handleDocumentSelection} />
            <View >
                {error ? <Text>{error}</Text> : data.map((col, idx) =>
                    <View key={idx}>
                        {col}
                    </View>)}
            </View>
        </SafeAreaView>
    );
};
export default CsvUploadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        paddingTop: 4,
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff',
        color: '#fff'
    },
    text: {
        margin: 6
    },
});



// import React, { useEffect } from 'react';
// import { StyleSheet, View } from 'react-native';
// import csv from 'csvtojson';
// import { DataTable } from 'react-native-paper';

// export default function CsvUploadScreen(props) {

//     const [page, setPage] = React.useState(0);
//     const [numberOfItemsPerPage, setNumberOfItemsPerPage] = React.useState(10);
//     const csvFileUrl = "/Users/eddy/Desktop/miStuff/Code/TextFiles/MSFT.csv"

//     const [state, setState] = React.useState({
//         tableHead: [],
//         tableData: [
//             []
//         ],
//         currentPageData: [
//             []
//         ],
//         numberOfPages: 1
//     });

//     useEffect(() => {
//         setTableData(props.csvFileUrl);
//         setNumberOfItemsPerPage(props.numItemsPerPage);
//     }, []);

//     useEffect(() => {
//         setCurrentPageData();
//     }, [page]);

//     useEffect(() => {
//         setCurrentPageData();
//     }, [state.tableData]);

//     const setCurrentPageData = () => {
//         const startIndex = page * numberOfItemsPerPage;
//         let endIndex = startIndex + numberOfItemsPerPage;
//         if (endIndex > state.tableData.length) {
//             endIndex = state.tableData.length - 1;
//         }
//         if (state.tableData.length > 1) {
//             setState({
//                 ...state,
//                 currentPageData: state.tableData.slice(startIndex, endIndex)
//             });
//         }
//     }

//     const setTableData = (csvFileUrl) => {
//         fetch(csvFileUrl)
//             .then(async (response) => {
//                 const resp = await response.text();
//                 csv({
//                     noheader: true,
//                     output: "csv"
//                 }).fromString(resp)
//                     .then((csvRow) => {
//                         let pages = (csvRow.length / numberOfItemsPerPage);
//                         if (csvRow.length > numberOfItemsPerPage * pages) {
//                             pages = pages + 1;
//                         }
//                         setState({
//                             ...state,
//                             tableHead: csvRow[0],
//                             tableData: csvRow.slice(1),
//                             numberOfPages: pages
//                         });
//                     })
//             })
//             .catch((error) => {
//                 console.error("some error occurred", error);
//             });
//     }

//     return (
//         <View style={styles.container}>
//             <DataTable>
//                 <DataTable.Header>
//                     {
//                         state.tableHead.map((rowData, index) => (
//                             <DataTable.Title key={index}>
//                                 {rowData}
//                             </DataTable.Title>
//                         ))
//                     }
//                 </DataTable.Header>

//                 {
//                     state.currentPageData.map((rowData, index) => (
//                         <DataTable.Row key={index}>
//                             {
//                                 rowData.map((cellData, cellIndex) => (
//                                     <DataTable.Cell key={cellIndex}>{cellData}</DataTable.Cell>
//                                 ))
//                             }
//                         </DataTable.Row>
//                     ))
//                 }

//                 <DataTable.Pagination
//                     page={page}
//                     numberOfPages={state.numberOfPages}
//                     onPageChange={(page) => setPage(page)}
//                     label={`Page ${page + 1} of ${state.numberOfPages}`}
//                     showFastPagination
//                     optionsLabel={'Rows per page'}
//                 />
//             </DataTable>
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 4,
//         paddingTop: 4,
//         backgroundColor: '#fff'
//     },
//     head: {
//         height: 40,
//         backgroundColor: '#f1f8ff',
//         color: '#fff'
//     },
//     text: {
//         margin: 6
//     },
// });
// view rawDisplayCsvDataTable.js hosted with ❤ by GitHub