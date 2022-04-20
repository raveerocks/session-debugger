import './App.css';

import Body from './components/common/Body';
import Header from './components/common/Header';
import ReactModal from 'react-modal';
import { useState } from 'react';

ReactModal.setAppElement('#root');

const App = () => {
  const [isModalOpen, setModelOpen] = useState(false);
  return (
    <div className='zero-wrapper'>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setModelOpen(false)}
      ></ReactModal>
      <Header />
      <Body />
    </div>
  );
};
export default App;
