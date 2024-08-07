import React, { useState } from 'react';
import { Container, Col, Row, FormControl } from 'react-bootstrap';

function DevisDetail() {
    const [date, setDate] = useState(new Date().toISOString());
    console.log('Current Date:', date);

    return (
        <Container>
            <Row>
                <Col>
                    Détails du devis
                </Col>
            </Row>
            <hr style={{ width: '500px' }}></hr>
            <Row>
                <Col>
                    Date :
                </Col>
                <Col>
                    <FormControl type="text" disabled style={{ height: '30px', width: '15vh' }} value={date.slice(0, 10)} />
                </Col>
            </Row>
        </Container>
    );
}

export default DevisDetail;
