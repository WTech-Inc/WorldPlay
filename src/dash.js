const React = require('react');
const {useState} = React;
const ReactDOM =  require('react-dom');
require('./index.css');
const Modal = require('./components/Modal');

const App = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
       <>
      {/* 開始web */}
      <h2>歡迎 {user}</h2>
      </>
    );
};

ReactDOM.render(<App />, document.body);