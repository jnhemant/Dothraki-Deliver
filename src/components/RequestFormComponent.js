import React, { useEffect, useState } from 'react';
import { Nav, Jumbotron, NavbarToggler, Collapse, NavItem, Navbar, NavbarBrand, Button, Modal, ModalHeader, ModalBody, Label, Row, Input, Col } from 'reactstrap';
import { Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import { Control, LocalForm, Errors, Form, actions } from 'react-redux-form';
import { CSSTransitionGroup } from 'react-transition-group';
import handleViewport from 'react-in-viewport';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

const useProgressiveImage = src => {  
    const [sourceLoaded, setSourceLoaded] = useState(null)
  
    useEffect(() => {
      const img = new Image()
      img.src = src
      img.onload = () => setSourceLoaded(src)
    }, [src])
  
    return sourceLoaded;
  }

const RequestFormBlock = (props) => {
    const loaded = useProgressiveImage('./images/jumbo.jpg');
    const { inViewport, enterCount, forwardedRef} = props;

    const [formIsHalfFilledOut, setFormIsHalfFilledOut] = useState(false);
    const handleSubmit = async (values) => {
        setFormIsHalfFilledOut(false);
        await props.postRequestForm(values.destination, values.latitude, values.longitude, values.phone, props.history);
        //reset logic moved to ActionCreators.js
        // if(props.history.length === 1){
        //     props.resetRequestForm();
        // }        
    }

    useEffect(() => {
        // const status = ref.getBoundingClientRect();
        // console.log(status);
        if (formIsHalfFilledOut) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    });
    console.log("inViewport is:" + inViewport + " & enterCount is: " + enterCount);
    const jumboTextClass = (inViewport && enterCount === 1)?"jumbotext":"jumbotext-static";
    const requestFormClass = (inViewport && enterCount === 1)?"request-form":"request-form-static";
    // return(
    //     <>
    //     <div style={{height: '100vh'}}></div>
    //     <div ref={forwardedRef}>
    //     <div className="container">
    //         <div className={classNameVar} style={{ backgroundColor: "teal", height: '20vh' }}>
    //             <span>Wanna Send goods to your loved ones?</span>
    //         </div></div>
    // </div>
    // </>
    // )
    // if(!loaded){
        // return(
            //Loading animation (Option 1)
            // <Jumbotron style={{ backgroundColor: '#242b2c', height: '100vh'}}>
            //     <div className="container loading">
            //         <span className="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
            //         <p>Loading . . .</p>
            //     </div>                
            // </Jumbotron>

            //Blurred Pic (Option 2)
    //         <>
    //         <div style={{height: "100vh"}}> Hello! </div>
    //         <Jumbotron style={{ backgroundImage: `url('./images/placeholder.jpg')`, height: '100vh'}}></Jumbotron>
    //         </>
    //     )
    // }

    
    

    return (
        <>
        <div style={{height: '100vh'}}>
            Hello
        </div>
            <Jumbotron style={{ backgroundImage: `url(${loaded})`}}>
            <div ref={forwardedRef}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-12">                            
                            <div className="container">                            
                                <div className={jumboTextClass}>
                                    {/* <h1>Dothraki Delivery<span style={{color:"teal"}}>.</span></h1> */}
                                    <span>Wanna Send goods to your loved ones?</span>
                                </div>
                            </div>
                            
                        </div>
                        
                            <div className="col-md-4 col-sm-12">
                                <div className="container">
                                    <div className="row">
                                    <div className={requestFormClass}>
                                        <div className="request_form">
                                            <h4>Create a request</h4>
                                            <Form id="create-request" model="request" onSubmit={(values) => handleSubmit(values)}>
                                                <Prompt
                                                    when={formIsHalfFilledOut}
                                                    message="Are you sure you want to leave?"
                                                /><Row className="form-group">
                                                    <Label htmlFor="destination" md={12} sm={12}>Destination Address</Label>
                                                    <Col md={12} sm={12}>
                                                        <Control.text model=".destination" id="destination" name="destination" placeholder="Street, Landmark, City"
                                                            className="form-control" validators={{ required, minLength: minLength(10), maxLength: maxLength(25) }}
                                                            onChange={(event) => { !formIsHalfFilledOut && setFormIsHalfFilledOut(event.target.value.length > 0) }}
                                                        ></Control.text>
                                                        <Errors className="text-danger" model=".destination" show="touched"
                                                            messages={{
                                                                required: 'Required',
                                                                minLength: 'Must be greater than 10 chars',
                                                                maxLength: 'Must be smaller than or equal to 25 chars'
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Label htmlFor="latitude" md={12} sm={12}>Destination Latitude</Label>
                                                    <Col md={12} sm={12}>
                                                        <Control.text model=".latitude" id="latitude" name="latitude" placeholder="xx.xxxx"
                                                            validators={{ required, minLength: minLength(7), maxLength: maxLength(10) }}
                                                            className="form-control"
                                                            onChange={(event) => { !formIsHalfFilledOut && setFormIsHalfFilledOut(event.target.value.length > 0) }}>
                                                        </Control.text>
                                                        <Errors
                                                            className="text-danger"
                                                            model=".latitude"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required',
                                                                minLength: 'Must be greater than 7 chars',
                                                                maxLength: 'Must be smaller than or equal to 10 chars'
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Label htmlFor="longitude" md={12} sm={12}>Destination Longitude</Label>
                                                    <Col md={12} sm={12}>
                                                        <Control.text model=".longitude" id="longitude" name="longitude"
                                                            placeholder="yy.yyyy" className="form-control"
                                                            validators={{ required, minLength: minLength(7), maxLength: maxLength(10) }}
                                                            onChange={(event) => { !formIsHalfFilledOut && setFormIsHalfFilledOut(event.target.value.length > 0) }}
                                                        ></Control.text>
                                                        <Errors
                                                            className="text-danger"
                                                            model=".longitude"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required',
                                                                minLength: 'Must be greater than 7 chars',
                                                                maxLength: 'Must be smaller than or equal to 10 chars'
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Label htmlFor="phone" md={12} sm={12}>Destination's Contact No.</Label>
                                                    <Col md={12} sm={12}>
                                                        <Control.text model=".phone" id="phone" name="phone"
                                                            placeholder="Phone number of receiver" className="form-control"
                                                            validators={{ required, minLength: minLength(10), maxLength: maxLength(10), isNumber }}
                                                            onChange={(event) => { !formIsHalfFilledOut && setFormIsHalfFilledOut(event.target.value.length > 0) }}
                                                        ></Control.text>
                                                        <Errors
                                                            className="text-danger"
                                                            model=".phone"
                                                            show="touched"
                                                            messages={{
                                                                required: 'Required',
                                                                minLength: 'Must be greater than 9 numbers',
                                                                maxLength: 'Must be smaller than or equal to 10 numbers',
                                                                isNumber: 'Must be a number'
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="form-group">
                                                    <Col md={{ size: 12, offset: 0 }} sm={{ size: 12, offset: 0 }}>
                                                        <Button type="submit" className="requestFormButton" block>
                                                            Create Request
                                    </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
                </div>
            </Jumbotron>

        </>
    )
}

const ViewportBlock = handleViewport(RequestFormBlock,);

const RequestForm = (props) => (
    <div>
        <ViewportBlock onEnterViewport={() => console.log('enter')} onLeaveViewport={() => console.log('leave')} />
    </div>
)

export default RequestForm;