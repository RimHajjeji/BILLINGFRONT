import React, { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { date } from './dateObject';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ClientChart({ ...props }) {
    const InvoiceClient = useSelector(state => state?.Show_invoice_byClient?.data?.result)
    const MontClient = useSelector(state => state?.Show_invoice_byClient?.data)
    const Sum = useSelector(state => state?.Show_invoice_byClient?.data?.sum)
    const [factureDate, setFactureDate] = useState([])
    const [dateDebut, setDateDebut] = useState(null)
    const [dateFin, setDateFin] = useState(null)
    const [facrureDateNp, setFactureDateNp] = useState([])
    const [option, setOption] = useState(
        {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'List des factures ',
                },
            },
        })
    const [dateObject, setDateObject] = useState(date)
    const [objectChart, setObjectChart] = useState(
        {
            abels: dateObject?.map(el => el?.name),
            datasets: [
                {
                    label: 'Facture Payer',
                    data: factureDate,
                    backgroundColor: [
                        'rgba(53, 162, 235, 0.5)'

                    ],
                },
                {
                    label: ' Facture non payer',
                    data: facrureDateNp,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)'
                    ]
                }
            ],
        }
    )
    useEffect(() => {
        let arr = []
        let arrNp = []
        dateObject?.map((el) => {
            let number = 0
            let number2 = 0
            InvoiceClient?.map((el2) => {
                let date = el2?.createdAt?.slice(5, 7)
                if (String(el?.id) === String(date) && el2?.etats === true)
                    number = number + 1
                else if (String(el?.id) === String(date) && el2?.etats === false)
                    number2 = number2 + 1
            })
            arr = [...arr, number]
            arrNp = [...arrNp, number2]
        })
        setFactureDate(arr)
        setFactureDateNp(arrNp)
    }, [dateObject, InvoiceClient])
    useEffect(() => {
        setObjectChart({
            labels: dateObject?.map(el => el?.name),
            datasets: [
                {
                    label: 'Facture Payer',
                    data: factureDate,
                    backgroundColor: [
                        'rgba(53, 162, 235, 0.5)'

                    ],
                },
                {
                    label: ' Facture non payer',
                    data: facrureDateNp,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)'
                    ]
                }
            ],
        })
    }, [factureDate, facrureDateNp])
    useEffect(() => {
        if (dateDebut !== null && dateFin !== null) {
            setObjectChart({
                labels: dateObject?.filter(el => el?.id >= dateDebut.slice(5, 7) && el?.id <= dateFin.slice(5, 7)).map(el => el?.name),
                datasets: [
                    {
                        label: 'Facture Payer',
                        data: factureDate,
                        backgroundColor: [
                            'rgba(53, 162, 235, 0.5)'

                        ],
                    },
                    {
                        label: ' Facture non payer',
                        data: facrureDateNp,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)'
                        ]
                    }
                ],
            })
        }
    }, [dateDebut, dateFin])
    console.log('data of invoice of specifiq client', dateDebut, dateFin, dateObject)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{ padding: '30px' }}>
                <Row>
                    <Col>
                        <div className="cdt cadre-total">
                            <h3>TOTAL</h3>
                            <h4>FAC: {MontClient?.etat?.total} </h4>
                            <h4>MTHT: {MontClient?.sum?.montantHTT}  CFA</h4>
                        </div>
                    </Col>
                    <Col>
                        <div className="cdt cadre-paye">
                            <h3>PAYE</h3>
                            <h4>FAC: {MontClient?.etat?.pay}</h4>
                            <h4>MTHT:  {MontClient?.sum?.montontHTP} CFA</h4>
                        </div>
                    </Col>
                    <Col>
                        <div className="cdt cadre-nonpaye">
                            <h3>NON PAYE </h3>
                            <h4>FAC: {MontClient?.etat?.notpay}</h4>
                            <h4>MTHT: {MontClient?.sum?.montontHTNP}  CFA</h4>
                        </div>
                    </Col>
                </Row>




            </Modal.Header>
            <Modal.Body>
                <Row>
                    {/*   <Col><span>Date début</span> <input value={dateDebut} type="date" onChange={(e) => setDateDebut(e.target.value)} /></Col>
                    <Col> <span>Date fin</span><input value={dateFin} onChange={(e) => setDateFin(e.target.value)} type="date" /></Col> */}
                </Row>
                <Bar options={option} data={objectChart} />
            </Modal.Body>
        </Modal>
    )
}

export default ClientChart