import React, { useEffect, useState } from 'react'
import { Del_material, Show_material_byCompany } from '../../store/material/action'
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, Table, Form, Col, Row } from 'react-bootstrap'
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import '../../styles/material/Materila.css'
import MaterialRegistre from './MaterialRegistre';
import MaterialUpdate from './MaterialUpdate';
import ModalAlert from '../modal/ModalAlert';
function Material() {

  const dispatch = useDispatch();

  const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
  const material = useSelector(state => state?.Show_material_byCompany?.data)
  const [modalShow, setModalShow] = React.useState(false);
  const [updShow, setUpdShow] = React.useState(false);
  const [show, setShow] = useState(false)
  const [deleteMaterial, setDeleteMaterial] = useState({})
  const [selectedElement, setSelecetedElement] = React.useState()
  const [materials, setMaterials] = useState('')
  const [filtredMaterial, setFiltredMaterial] = React.useState([])

  const keys = [
    "nom",
    "categorie",
    "ref_intr",
    "prix",
    "mt_tva",
    "ttc",

  ]

  useEffect(() => {
    dispatch(Show_material_byCompany(Idcopany))
  }, [Idcopany])
  const update = () => {
    dispatch(Del_material(deleteMaterial?._id, deleteMaterial?.companyId))
    handerClose()
  }

  const handerClose = () => {
    setShow(false)
  }

  useEffect(() => {
    if (materials?.length > 0) {
      setFiltredMaterial(material?.filter((el) => {
        return (
          keys.some((key) => el[key]?.toLowerCase()?.includes(String(materials)) === true)
        )
      }))
    }
    else
      setFiltredMaterial(material)
  }, [materials, material])


  return (



    <div className='container' style={{ marginTop: '60px' }}>
      <Row style={{ textAlign: 'center', fontSize: '40px' }}>
        <Col></Col>
        <Col><h1>MATERIEL</h1></Col>
        <Col></Col>

      </Row>
      <div className="serachh">
        <Form.Group value={materials} onChange={(e) => setMaterials(e.target.value)} style={{ marginTop: '40px' }} controlId="text">
          <Form.Control className="input-search" type="text" placeholder="search..." />
        </Form.Group>
      </div>
      <div className="add">

        <Button onClick={() => setModalShow(true)} className='btnn' variant="outline-primary">Ajouter material</Button>
        <MaterialRegistre
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

        <tbody className="tbody-material">
          {filtredMaterial?.length > 0 && filtredMaterial?.map((el) => {
            return (
              <tr key={el?._id}>
                <td>{el?.nom}</td>
                <td>{el?.categorie}</td>
                <td>{el?.ref_intr}</td>
                <td>{el?.amount} Pice</td>
                <td>{el?.prix} CFA</td>
                <td>{/* el?.tva === 0 ? "0" : */ Math.round(parseFloat(el?.tva) * 100)}%</td>
                <td>{parseFloat(el?.mt_tva).toFixed(3)} CFA</td>
                <td>{parseFloat(el?.ttc).toFixed(3)} CFA</td>
                <td>
                  <div className='accbt'>
                    <Button onClick={() => {
                      setUpdShow(true)
                      setSelecetedElement(el)
                    }

                    } variant="outline-info" ><MdOutlineModeEdit /></Button>
                    <MaterialUpdate
                      show={updShow}
                      element={selectedElement}
                      onHide={() => setUpdShow(false)}
                    />

                    <Button onClick={() => {
                      setDeleteMaterial(el)
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
        header={"supprimer materials"}
        body={"Voulez vous supprimer cette material?"}
        valider={"supprimer"}
        variants={"outline-danger"}
      />
    </div>
  )
}

export default Material