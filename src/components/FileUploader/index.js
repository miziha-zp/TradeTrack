import {useState} from 'react';
import { Button, Form } from "react-bootstrap";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import moment from 'moment'
import jsPDF from 'jspdf';


export const FileUploader = ({setCids, setIpfsError, setSendingState}) => {
    
    const [tracks, setTrack] = useState([]);

    const onInputChange = (event) => {
        // tracks.push({
        //     inputs:event.target.value
        // })
        setTrack([
            ...tracks,
            event.target.value
          ]);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const doc = new jsPDF();
        
        doc.setFontSize(20);
        doc.text(20, 20, 'Trade Information');
        let time = moment().format('YYYY-MM-DD HH:mm:ss');
        
        for(let i = 1; i <= 10; i++){
            doc.text(20 * i, 140 + 20 * (i - 1), time, 45);
        }
        
        doc.text('Seller\'s name:', 20, 40);
        doc.text('Purchaser\'s name:', 20, 48);
        doc.text('Transaction amount:', 20, 56);
        doc.text('Trading items:', 20, 64);
        doc.text('Others:', 20, 72);
        doc.text(tracks, 90, 40);
        doc.save()
        console.log(tracks)
        let file2 = new window.File([tracks], "tradeInfo.doc")
        
        
        const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMzOUUwQTNmM2Y4MjZiOTY2MkE4MDUxNjRCZGE1MDZlZDZjODYyQzQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTc4Nzc0OTk4NDYsIm5hbWUiOiJwZGYtdG9rZW4ifQ.gTI3h5qYbBfRUiZu0kqOUpQ-ZJIKdKkf-m6UzEHvEd4' });

        try {
            setSendingState(true);
            const rootCid = await client.put([file2]);
            console.log("Successfully sent to IPFS");
            console.log("https://" + rootCid + ".ipfs.dweb.link");
            setCids([rootCid]);
        } catch(e) {
            setIpfsError(true);
            console.log("Failed to send to IPFS");
            console.log(e);
            setSendingState(false);
        }

    }

    return (
        <div>
            <p></p>
            <p></p>
            <p></p>
            <p>Enter the trade information as prompted.</p>
            <Form method="post" action="#" id="#"  onSubmit={onSubmit}>
                <Form.Group className="mb-3 form-group files">
                <p></p>
                Seller's name：<input type="text"
                        onBlur={onInputChange}
                        className="form-control"
                        name="name1"
                        multiple/>
                        <p></p>
                Purchaser's name：<input type="text"
                        onBlur={onInputChange}
                        className="form-control"
                        name="name2"
                        multiple/>
                        <p></p>
                Transaction amount：<input type="text"
                        onBlur={onInputChange}
                        className="form-control"
                        name="name3"
                        multiple/>
                        <p></p>
                Trading items：<input type="text"
                        onBlur={onInputChange}
                        className="form-control"
                        name="name4"
                        multiple/>
                        <p></p>
                Others：<input type="text"
                        onBlur={onInputChange}
                        className="form-control"
                        name="name5"
                        multiple/>
                </Form.Group>

                <Button variant="dark" type="submit">
                    Send to IPFS
                </Button>
            </Form>
        </div>
    )
}