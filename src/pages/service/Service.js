import React, { useEffect, useState } from 'react'
import { Show_service_byCompany, Del_service } from '../../store/service/action'
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, Table, Form, Row, Col } from 'react-bootstrap'
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import '../../styles/service/Service.css'
import RegisterService from './ServiceRegistre'
import UpdateService from './ServiceUpdate'
import ModalAlert from '../modal/ModalAlert';
function Service() {



  const dispatch = useDispatch();

  const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
  const service = useSelector(state => state?.Show_service_byCompany?.data)
  const [modalShow, setModalShow] = useState(false);
  const [updShow, setUpdShow] = useState(false);
  const [selectedElement, setSelecetedElement] = useState()
  const [show, setShow] = useState(false)
  const [deletes, setDeletes] = useState({})
  const [services, setServices] = useState('')
  const [filtredService, setFiltredService] = React.useState([])

  const keys = [
    "nom",
    "categorie",
    "ref_intr",
    "prix",
    "mt_tva",
    "ttc",

  ]
  useEffect(() => {
    dispatch(Show_service_byCompany(Idcopany))
  }, [Idcopany])


  console.log('service map', service)

  const update = () => {
    dispatch(Del_service(deletes?._id, deletes?.companyId))
    handerClose()
  }

  const handerClose = () => {
    setShow(false)
  }

  useEffect(() => {
    if (services?.length > 0) {
      setFiltredService(service?.filter((el) => {
        return (
          keys.some((key) => el[key]?.toLowerCase()?.includes(String(services)) === true)
        )
      }))
    }
    else
      setFiltredService(service)
  }, [services, service])

  return (



    <div className='container' style={{ marginTop: '60px' }}>
      <Row style={{ textAlign: 'center', fontSize: '40px' }}>
        <Col></Col>
        <Col><h1>SERVICE</h1></Col>
        <Col></Col>

      </Row>
      <div className="serachh">
        <Form.Group value={services} onChange={(e) => setServices(e.target.value)} style={{ marginTop: '40px' }} controlId="text">
          <Form.Control className="input-search" type="text" placeholder="search..." />
        </Form.Group>
      </div>
      <div className="add">

        <Button onClick={() => setModalShow(true)} className='btnn' variant="outline-primary">Ajouter Services</Button>
        <RegisterService
          show={modalShow}
          onHide={() => setModalShow(false)}
        />



      </div>

      <div className="d-grid gap-2">





        {/*   <div class="left">
                    <AiOutlineCaretLeft />
                </div> */}


        {/*  <ButtonGroup className="mb-2" size="lg" aria-label="First group">
                    {Month.map((el) => {
                        return (
                            <Button className='test' size='lg' variant="secondary" key={el.id}>{el.month}</Button>
                        )
                    }
                    )}
                </ButtonGroup> */}
      </div>
      <Table striped borderless="true" hover responsive size="lg" className="calender-table"  >
        <thead className="thead-invoice">
          <tr >
            <th  >NOM</th>
            <th >CATEGORIE</th>
            <th >REF_INTERNET</th>
            <th >QANTITER</th>
            <th >PRIX</th>
            <th >TVA</th>
            <th >MT TVA</th>
            <th >MT TTC</th>
            <th >ACTIONS</th>
          </tr>
        </thead>

        <tbody className="tbody-service">
          {filtredService?.length > 0 && filtredService?.map((el) => {
            return (
              <tr key={el?._id}>
                <td>{el?.nom}</td>
                <td>{el?.categorie}</td>
                <td>{el?.ref_intr}</td>
                <td>{el?.amount}</td>
                <td>{el?.prix} CFA</td>
                <td>{Math.round(parseFloat(el?.tva) * 100)}%</td>
                <td>{parseFloat(el?.mt_tva).toFixed(3)} CFA</td>
                <td>{parseFloat(el?.ttc).toFixed(3)} CFA</td>
                <td>
                  <div className='accbt'>
                    <Button onClick={() => {
                      setUpdShow(true)
                      setSelecetedElement(el)
                    }

                    } variant="outline-info" ><MdOutlineModeEdit /></Button>
                    <UpdateService
                      show={updShow}
                      element={selectedElement}
                      onHide={() => setUpdShow(false)}
                    />

                    <Button onClick={() => {
                      setDeletes(el)
                      setShow(true)
                      /* props?.change && props.change() */
                    }} variant='outline-danger'><div className='delicon'><MdDeleteForever /></div> </Button>
                  </div>

                </td>

              </tr>
            )
          })}
        </tbody>


      </Table>
      <ModalAlert
        show={show}
        btnClicked={update}
        handleClose={handerClose}
        header={"supprimer services"}
        body={"Voulez vous supprimer cette service?"}
        valider={"supprimer"}
        variants={"outline-danger"}
      />
    </div>
  )
}

export default Service