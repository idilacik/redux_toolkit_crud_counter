import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/slices/crudSlice";

const FormModal = ({ editItem, isOpen, handleClose }) => {
  const dispatch = useDispatch();

  // formun gonderilmesi
  const handleSubmit = (e) => {
    e.preventDefault();

    // formData ornegini olustur
    const formData = new FormData(e.target);
    // inputlardaki bilgileri nesneye cevir
    const taskData = Object.fromEntries(formData.entries());

    if (editItem) {
      //reducer'a guncellenecek elemani haber ver
      dispatch(editTask({ id: editItem.id, ...taskData }));
    } else {
      //reducer'a yeni task'in eklenecegini haber ver
      dispatch(addTask(taskData));
    }

    //modal'i kapatma eklenir
    handleClose();
  };

  return (
    <Modal centered show={isOpen} onHide={handleClose} className="text-black">
      <Modal.Header closeButton>
        <Modal.Title>
          {editItem ? "Gorevi Guncelle" : "Yeni Görev Ekle"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          <Form.Group>
            <Form.Label>Gorev basligi:</Form.Label>
            <Form.Control
              name="title"
              placeholder="Navbari Duzenle"
              defaultValue={editItem?.title}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Isminiz:</Form.Label>
            <Form.Control
              name="author"
              defaultValue={editItem?.author}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Gorev atanacak kisi:</Form.Label>
            <Form.Control
              name="assigned_to"
              defaultValue={editItem?.assigned_to}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Teslim Tarihi: </Form.Label>
            <Form.Control
              name="end_date"
              defaultValue={editItem?.end_date}
              type="date"
              required
            ></Form.Control>
          </Form.Group>
          {/* buttons */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              iptal
            </Button>
            <Button type="submit" variant="primary">
              {editItem ? "kaydet" : "olustur"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
