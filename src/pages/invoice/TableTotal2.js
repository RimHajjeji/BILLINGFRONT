import React from 'react'
import '../../styles/invoice/TableTotal2.css'
import { Table, Container } from 'react-bootstrap'
function TableTotal2({ values, ...props }) {
    return (
        <Container>
            <Table striped borderless="true" hover responsive size="lg" className="tab calender-table"  >
                <tbody className=" thead-invoice">
                    <tr  >
                        <td>Total HT</td>
                        <td >{values?.totalHt} TND</td>
                    </tr>
                    <tr>
                        <td>TOTAL TVA</td>
                        <td>{(values?.TotalTVA).toFixed(3)} TND</td>
                    </tr>
                    <tr>
                        <td>TOTAL TTC</td>
                        <td>{(values?.TotalTTc).toFixed(3)} TND</td>
                    </tr>
                    <tr>
                        <td>TIMBRE FISCAL</td>
                        <td>{(values?.Tmf).toFixed(3)} TND</td>
                    </tr>
                    <tr>
                        <td><strong>NET À PAYER</strong> </td>
                        <td><strong>{(values?.net).toFixed(3)} TND</strong></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default TableTotal2