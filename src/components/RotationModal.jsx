import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { string, bool } from 'prop-types';
import iconRotation from '../assets/Icons/Icon-rorate-landscape.svg';
import './RotationModal.css';

const RotationModal = (props) => {
  const { show, message } = props;
  return (
    <Modal show={show} autoFocus centered dialogClassName="alert-modal">
      <Modal.Body>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <div className="icon-container">
            <img src={iconRotation} alt="rotation icon" />
          </div>
          <p className="message">{message}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

RotationModal.propTypes = {
  show: bool,
  message: string.isRequired
};

RotationModal.defaultProps = {
  show: false
};

export default RotationModal;
