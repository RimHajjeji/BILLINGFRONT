import React, { useState } from 'react'
import { Container, Col, Row, FormControl } from 'react-bootstrap'
function InvoiceDetail() {
    const [date, setDate] = useState(new Date().toISOString())
    console.log('fesdqs', date)
    return (
        <Container>
            <Row>
                <Col>
                    Détails du document
                </Col>
            </Row>
            <hr style={{ width: '500px' }}></hr>
            <Row>
                <Col>
                    Date :
                </Col>
                <Col>
                    <FormControl type="text" disabled="true" style={{ height: '30px', width: '15vh' }} value={date.slice(0, 10)} />
                </Col>
            </Row>
        </Container>
    )
}

export default InvoiceDetail