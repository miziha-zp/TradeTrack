import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { Success } from './components/Success';
import { Error } from './components/Error';
import { Sending } from './components/Sending';
import './App.css';
import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './assets/jy1.png';

function App(){

    const [cids, setCids] = useState([]);
    const [ipfsError, setIpfsError] = useState(false);
    const [sending, setSendingState] = useState(false);
    
    return (
      <div className="App">
          
          <Container className="p-3">
          <Card style={{ width: '30rem', minHeight: '35rem'}}>
          <Card.Img variant="top" src={Logo} style={{ width: '5rem', minHeight: '5rem'}}/>
            <Card.Body>
              <Card.Title>
                Web 3.0 helps you track your important trade.
                </Card.Title>
                { (cids.length === 0) && (sending === false) ? <FileUploader setCids={setCids} setIpfsError={setIpfsError} setSendingState={setSendingState} /> :null }
                { cids.length !== 0 ? <Success cids={cids} setCids={setCids} setSendingState={setSendingState} /> : null }
                { sending ? <Sending setSendingState={setSendingState}/> : null }
                { ipfsError ? <Error setIpfsError={setIpfsError} setSendingState={setSendingState}/> : null }
            </Card.Body>
          </Card>
      </Container>
      </div>
    );
}

export default App;
