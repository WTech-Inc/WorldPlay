import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Modal from 'component/Modal';

const App = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
       <>
      {/* 開始web */}
      </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));