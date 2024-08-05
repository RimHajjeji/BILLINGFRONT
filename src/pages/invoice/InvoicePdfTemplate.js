import React, { useRef, useState } from 'react'
import { Col, Row, Container, Modal, Image, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl } from '../../config/base'
import PdfD from '../../assets/PdfD.svg'
import ReactToPdf from 'react-to-pdf'
import { BsTelephone } from 'react-icons/bs'
import { GiRotaryPhone } from 'react-icons/gi'
import { FiMail } from 'react-icons/fi'
import { equal } from 'assert'
function InvoicePdfTemplate({ clientObject, dateErp, totalTable, productObject, ...props }) {
    const company = useSelector(state => state?.Show_company_byUser?.data[0])
    const [size, setSize] = useState('xl')
    const ref = React.createRef()
    const options = {
        orientation: 'landscape',
        unit: 'in',
        /*  format: [12, 11] */
    }
    console.log('tririr', clientObject)
    return (

        <Modal
            {...props}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <div ref={ref}>
                <Row>

                    {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> */}
                    <Col lg={4}>
                        <Image width={250} src={`${baseUrl}/company/get_company/image/${company?.image?.filename}`} />
                    </Col>
                    <Col lg={4}></Col>
                    <Col lg={4}/* style={{ marginLeft: '70vh' }} */ >
                        <h1>Facture</h1>
                        <h3>N° FAC-{props?.numfac}</h3>
                    </Col>
                    {/*  </div> */}

                </Row>
                <Modal.Body>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="custom-border" style={{ padding: '10px', width: '300px' }} >
                            <h4>Client </h4>
                            <hr />
                            {clientObject?._id !== undefined && Object?.keys(clientObject)?.map((key) => {
                                if (key !== 'companyId' && key !== 'address' && key !== 'fax' && key !== 'tle' && clientObject[key] !== undefined && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && key !== '_id')
                                    return (
                                        <div><strong>{key} : {clientObject[key]}</strong></div>
                                    )
                            })}
                            {/* {clientObject?._id !== undefined && for (const [key, value] of Object.entries(object1)) {
                        ;}} */}
                        </div>
                        <div className="custom-border" style={{ padding: '10px', width: '300px' }}>
                            <strong>Date: {dateErp?.slice(0, 10)}</strong>
                        </div>
                    </div>
                    <hr style={{ height: '3px' }}></hr>

                    <Row>
                        <Table striped borderless="true" hover responsive size="lg" className="calender-table"  >
                            <thead className="border2 backcolor">
                                <tr>
                                    <th>#</th>
                                    <th>Référence</th>
                                    <th>Désignation</th>
                                    <th>Quantité</th>
                                    <th>PU HT</th>
                                    <th>Total HT</th>
                                    <th>TVA</th>
                                    <th>MT TVA</th>
                                    <th>MT TTC</th>
                                </tr>
                            </thead>
                            <tbody className="border2 backcolor2">
                                {productObject?.length > 0 && productObject?.map((el, index) => (
                                    <tr key={el?._id}>
                                        <td>{index}</td>
                                        <td>{el?.ref_intr}</td>
                                        <td>{el?.nom}</td>
                                        <td>{el?.amount}</td>
                                        <td> {parseFloat(el?.prix).toFixed(3)} TND</td>
                                        <td>{(parseFloat(el?.prix) * parseFloat(el?.amount)).toFixed(3)} TND</td>
                                        <td>{Math.round(parseFloat(el?.tva) * 100)}%</td>
                                        <td>{parseFloat(el?.mt_tva).toFixed(3)} TND</td>
                                        <td>{parseFloat(el?.ttc).toFixed(3)} TND</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                    <hr style={{ height: '3px' }}></hr>
                    <Row>
                        <Col sm={{ span: 5, offset: "6" }}>
                            <Table striped borderless="true" hover responsive size="lg" className="tab calender-table"  >
                                <tbody className="border ">
                                    <tr  >
                                        <td style={{ borderRight: '1px solid  black' }}>Total HT</td>
                                        <td >{parseFloat(totalTable?.totalHt).toFixed(3)} TND</td>
                                    </tr>
                                    <tr>
                                        <td style={{ borderRight: '1px solid black' }}>TOTAL TVA</td>
                                        <td > {parseFloat((totalTable?.TotalTVA)).toFixed(3)} TND</td>
                                    </tr>
                                    <tr>
                                        <td style={{ borderRight: '1px solid black' }}>TOTAL TTC</td>
                                        <td >{parseFloat((totalTable?.TotalTTc)).toFixed(3)} TND</td>
                                    </tr>
                                    <tr>
                                        <td style={{ borderRight: '1px solid black' }}>TIMBRE FISCAL</td>
                                        <td >{parseFloat((totalTable?.Tmf)).toFixed(3)} TND</td>
                                    </tr>
                                    <tr >
                                        <td style={{ borderRight: '1px solid black' }} ><strong style={{ border: 'none' }}>NET À PAYER</strong> </td>
                                        <td ><strong style={{ border: 'none' }}>{parseFloat((totalTable?.net)).toFixed(3)} TND</strong></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>

                    </Row>
                    <hr style={{ height: '3px' }}></hr>
                    <Row>
                        <Col>
                            <div><strong>Raison sociale:</strong> {company?.raison_sociale}</div>
                            <div><strong>Adresse:</strong> {company?.address}</div>
                            <div><strong>MF:</strong> {company?.mf}</div>
                        </Col>
                        <Col>
                            <div> <BsTelephone size={20} /> {company?.tle}</div>
                            <div><GiRotaryPhone size={20} /> {company?.fax}</div>
                            <div><FiMail size={20} /> {company?.email}</div>
                        </Col>

                    </Row>
                </Modal.Body >
            </div >
            <hr style={{ height: '3px' }}></hr>
            <div style={{ padding: '10px' }}>
                <Row>
                    <Col lg={5}> </Col>
                    <ReactToPdf targetRef={ref} filename="invoice.pdf" /* options={options} */ /* x={.5} y={.5} scale={0.8} */>
                        {({ toPdf }) => <Col style={{ cursor: 'pointer' }} onClick={async () => {
                            await setSize('lg')
                            toPdf()
                        }} lg={4}>
                            <Image src={PdfD} width={100} />
                        </Col>}
                    </ReactToPdf>
                    <Col lg={5}> </Col>
                </Row>

            </div>
        </Modal >

    )
}

export default InvoicePdfTemplate