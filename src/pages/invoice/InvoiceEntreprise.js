import React from 'react'
import { Table, Container } from 'react-bootstrap'
function InvoiceEntreprise() {
    return (
        <Container>
            <Table striped borderless="true" hover responsive size="lg" className="calender-table"  >
                <thead className="thead-invoice">
                    <tr >
                        <th>TVA</th>
                        <th>Base</th>
                        <th>Montant</th>
                    </tr>
                </thead>
            </Table>
        </Container>
    )
}
export default InvoiceEntreprise