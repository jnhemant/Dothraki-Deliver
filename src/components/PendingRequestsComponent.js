import React from 'react';
import { Table } from 'reactstrap';

const PendingRequests = (props) => {
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    if(props.requests == null){
        return (
            <div className="container">
                <div className="row">
                    <h4>No requests pending!</h4>
                </div>
            </div>
        )
    }

    var serialNumber = 1;
    const requestsArray = props.requests.map(request => {
        var status = request.agent_id === null ? 'Waiting for agents': 'Request claimed by agent';
        return (
            <tr>
                <th scope="row">{serialNumber++}</th>
                <td>{request.consumer_address}</td>
                <td>{request.destination_address}</td>
                <td>{request.destination_phone}</td>
                <td>{request.distance_close===0?'No':'Yes'}</td>
                <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(request.date_time)))}</td>
                <td>{status}</td>
            </tr>
        );
      });
    return(
        <div className='container'>
        <h4>Pending Requests</h4>
        <Table responsive borderless hover striped className='text-center' size='md'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Pickup Address</th>
                    <th>Destination Address</th>
                    <th>Destination Phone</th>
                    <th>Approaching Destination</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {requestsArray}
            </tbody>
        </Table>
        </div>
    )
} 

export default PendingRequests;