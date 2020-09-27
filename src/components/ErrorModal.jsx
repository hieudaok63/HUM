import React from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import './ErrorModal.css';
import { errorSelector } from '../selectors/Error';

const ErrorModal = ({ show }) => (
  <Modal show={show} autoFocus centered dialogClassName="alert-modal">
    <Modal.Body>
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="exclamation-container">
          <p>!</p>
        </div>
        <p className="error-message">We are sorry</p>
        <p className="message">This unit is currently unavailable</p>
      </div>
    </Modal.Body>
  </Modal>
);

ErrorModal.propTypes = {
  show: bool.isRequired
};

const mapStateToProps = (state) => ({
  show: !!errorSelector(state)
});

export default connect(mapStateToProps)(ErrorModal);
