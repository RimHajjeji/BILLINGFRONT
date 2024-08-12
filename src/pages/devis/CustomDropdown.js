import React, { useEffect, useState, useRef } from 'react'
import { Container, Col, Row, FormControl, Table, ToastContainer, Toast, Button } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'
import { HiTemplate, HiOutlinePlus } from 'react-icons/hi'
function CustomDropdown({ data, name, hande, addP, setFacture, Facture, count, selectedMateriel, MaterielSelected, ServiceSelected, setMaterielType, ...props }) {
    const dispatch = useDispatch();
    const [item, setItem] = useState('')
    const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
    const ref = useRef()
    const [selectedData, setSelectedData] = useState({})
    const [FiltredData, setFiltredData] = useState([])
    const [ShowToast, setShowToast] = useState(false)
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowToast(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref])
    useEffect(() => {
        setMaterielType(name)
    }, [name])
    useEffect(() => {
        if (item) {
            setFiltredData(data?.filter((el) => {
                return String(el?.nom)?.includes(String(item)) === true
            }))
        }
        else {
            setFiltredData(data)
        }
    }, [data, item])
//    console.log('data is the', data)
    return (
        <Container style={{ marginTop: '20px' }}>
            <Col style={{ display: 'flex' }}>
                <FormControl style={{ height: '38px' }} value={item} onClick={() => {
                    setShowToast(true)
                    /* setSelectedData({}) */
                }} onChange={(e) => setItem(e.target.value)} type="text" />

                <Button style={{ marginLeft: '20px' }} onClick={addP} variant='outline-primary'><HiOutlinePlus /></Button>

            </Col>
            <ToastContainer className="p-3">
                <Toast ref={ref} show={ShowToast} onClose={data?.length === 0}>
                    <Toast.Header closeButton={false}>
                        <HiTemplate style={{ fontSize: '2rem' }} />
                        <strong className="me-auto"></strong>
                        <strong>{name}</strong>
                    </Toast.Header>
                    <Toast.Body style={{ cursor: 'pointer' }}>
    {FiltredData?.length > 0 && FiltredData?.map((el, index) => (
        <React.Fragment key={el?._id}>
            <p onClick={() => {
                setShowToast(false);
                if (Facture.map(elm => elm?._id)?.includes(el?._id) === false) {
                    setFacture(prev => [...prev, el]);
                    count(prev => prev + 1);
                    selectedMateriel && selectedMateriel(
                        FiltredData.filter(el2 => el2?._id === el?._id)[0]
                    );
                    if (name === 'Service') {
                        ServiceSelected(prev => [...prev, el?._id]);
                    } else {
                        MaterielSelected(prev => [...prev, el?._id]);
                    }
                }
            }}>{el?.nom}/{el?.ref_intr}</p>
            <hr />
        </React.Fragment>
    ))}
</Toast.Body>

                </Toast>
            </ToastContainer>
        </Container>
    )
}

export default CustomDropdown