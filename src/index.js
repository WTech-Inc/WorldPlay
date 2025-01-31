const React = require('react');
const {useState} = React;
const ReactDOM =  require('react-dom');
require('./index.css');
const Modal = require('components/Modal');

const App = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
       <>
      {/* 開始web */}
      <header className="app-header">
      <h2>世遊娛樂城</h2>
      <div className="auth-buttons">
        <button className="auth-button" onClick={handleOpenModal}>登錄</button>
        <button className="auth-button" onClick={handleOpenModal}>註冊</button>
       </div>
      </header>
      <br />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
         <h2>登錄 / 註冊</h2>
         <form action="/login" method="POST">
            <label>
              用戶名:
              <input type="text" name="user" required />
            </label>
            <br />
            <label>
              密碼:
              <input type="password" name="pw" required />
            </label>
            <br />
            <input type="checkbox" required />
            <label>我同意✅</label>
            <br />
            <button type="submit">登入/提交</button>
        </form>
         <button className="modal-close" onClick={handleCloseModal}>關閉</button>
        </Modal>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
