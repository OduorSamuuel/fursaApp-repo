import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia

const ProviderModal = ({ provider, onClose, onDelete }) => {
    const [editedProvider, setEditedProvider] = useState({ ...provider });
    const [editableCheckboxes, setEditableCheckboxes] = useState(true);
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setEditedProvider((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const handleSave = () => {
      // Use Inertia.post to send data to Laravel backend
      Inertia.put(`/admin/super/service-providers/${provider.id}`, editedProvider)
        .then(() => {
          onClose(); // Close modal on successful save
        })
        .catch((error) => {
          console.error('Error updating provider:', error);
        });
    };
  
    const handleDelete = () => {
      onDelete(provider.id);
      onClose();
    };
  
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Provider Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="company_name"
                  value={editedProvider.company_name}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formServiceType">
                <Form.Label>Service Type</Form.Label>
                <Form.Control
                  type="text"
                  name="service_type"
                  value={editedProvider.service_type}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formContactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_number"
                  value={editedProvider.contact_number}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={editedProvider.address}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as={Col}>Is Verified:</Form.Label>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="verifiedCheckbox"
                    label="Verified"
                    name="is_verified"
                    checked={editedProvider.is_verified}
                    onChange={handleChange}
                    disabled={!editableCheckboxes}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as={Col}>Is Admin:</Form.Label>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="adminCheckbox"
                    label="Admin"
                    name="is_admin"
                    checked={editedProvider.is_admin}
                    onChange={handleChange}
                    disabled={!editableCheckboxes}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as={Col}>Is Approved:</Form.Label>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="approvedCheckbox"
                    label="Approved"
                    name="is_approved"
                    checked={editedProvider.is_approved}
                    onChange={handleChange}
                    disabled={!editableCheckboxes}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProviderModal;
