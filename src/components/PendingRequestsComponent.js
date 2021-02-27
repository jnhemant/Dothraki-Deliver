import React from 'react';
import { Table, Row, Col, Button} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { HashLink } from 'react-router-hash-link';

const PendingRequests = (props) => {
    if(!props.isLoggedIn.isLoggedIn){
        props.addTargetRoute("/pendingrequests");
        console.log(props.targetRoute);
        return <Redirect to="/login#login-form"/>
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    if(props.isLoading){        
        return(
            <div className="container">
                <div className="row">
                    <h4>Loading...</h4>
                <Loading />
                </div>
            </div>
            );        
    }
    if(props.requests === null){
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
            <tr key={serialNumber}>
                <th scope="row">{serialNumber++}</th>
                <td>{request.consumer_address}</td>
                <td>{request.destination_address}</td>
                <td>{request.destination_phone}</td>
                <td>{request.distance_close===0?'No':'Yes'}</td>
                <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(Date.parse(request.date_time)))}</td>
                <td>{status}</td>
            </tr>
        );
      });
    return(
        <div className='container pending_request'>
            <Row style={{padding: "10px 0px 10px 0px"}}>
            <Col md={6} sm={3} xs={3}>
                    <HashLink smooth to="/home#create-request" target="_blank">
                        <Button>
                            <span className="fa fa-external-link-square fa=lg"></span>
                            {' '}Create new request
                        </Button>
                    </HashLink>
                </Col>
            </Row>
            <Row style={{padding: "20px 0px 5px 0px"}}>                
                <Col md={6} sm={3} xs={3}>
                    <h4>Pending Requests</h4>
                </Col>
            </Row>
        <Table responsive borderless hover striped className='text-center' size='sm' id="pending-requests">
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