import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import iconRotation from '../assets/Icons/Icon-rorate-landscape.svg';
import './RotationModal.css';
import { showSelector, messageSelector } from '../selectors/Rotation';

const RotationModal = ({ message }) => {
  const [show, setShow] = useState(window.innerWidth < 568);
  useEffect(() => {
    function handleResize() {
      setShow(window.innerWidth < 568);
    }
    window.addEventListener('resize', handleResize);
  });
  return (
    <div className={show ? 'd-block' : 'd-none'}>
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
    </div>
  );
};

RotationModal.propTypes = {
  message: string.isRequired
};

const stateMapToProps = () => ({
  show: showSelector(),
  message: messageSelector()
});

export default connect(stateMapToProps)(RotationModal);
