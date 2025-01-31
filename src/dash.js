const React = require('react');
const {useState} = React;
const ReactDOM =  require('react-dom');
require('./index.css');
const Modal = require('component/Modal');

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