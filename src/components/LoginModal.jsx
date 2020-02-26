import React from 'react';
import { bool, func, string } from 'prop-types';
import Modal from 'react-bootstrap4-modal';
import AthumLogo from '../assets/athum.png';

const LoginModal = (props) => {
  const { showModal, onClick, setInput, login, registerUrl } = props;
  return (
    <Modal
      visible={showModal}
      onClickBackdrop={onClick}
      className={`modal ${showModal &&
        'd-flex justify-content-center align-items-center'}`}
    >
      <div className="modal-body">
        <div className="form-group row">
          <div className="col-sm-12 d-flex justify-content-center align-items-center">
            <img
              style={{ width: '40px', height: '40px' }}
              src={AthumLogo}
              alt="logo"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={(e) => setInput(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={(e) => setInput(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <button
            type="submit"
            className="btn login-button btn-primary mx-auto"
            onClick={login}
          >
            Login
          </button>
        </div>
        <div className="form-group row">
          <div className="mx-auto">
            <a href={registerUrl}>Register</a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

LoginModal.propTypes = {
  showModal: bool.isRequired,
  onClick: func.isRequired,
  setInput: func.isRequired,
  login: func.isRequired,
  registerUrl: string.isRequired
};

export default LoginModal;
