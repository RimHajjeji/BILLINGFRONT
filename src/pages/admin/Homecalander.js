import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'sassy-datepicker';



function Homecalander({ element, changeDate, ...props }) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state?.LoginUser?.data?.new?._id)
    const [changedt, setChangedt] = useState();
    /* useEffect(() => {
        setChangedt(element?.userId?.abon)
    }, [userId]) */
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/*   <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Modal heading
      </Modal.Title>
    </Modal.Header> */}
            <Modal.Body>

                <div class="signup-formS">
                    <Form >
                        <DatePicker onChange={changeDate} />
                    </Form>
                </div>
            </Modal.Body >
            <Modal.Footer>
                <Button onClick={() => {

                }} variant="outline-success" type="submit">Modifier</Button>
                <Button onClick={() => {

                    props.onHide()
                }} variant="outline-danger" >Fermer</Button>


            </Modal.Footer>
        </Modal >

    )
}

export default Homecalander