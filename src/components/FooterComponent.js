import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
function Footer(props){
    return(
        <div className="footer">
        <div className="container">
            <div className="row justify-content-left">             
                {/* <div className="col-4 offset-1 col-sm-2">
                    <address>
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/aboutus">About</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="contactus">Contact Us</Link></li>
                    </ul></address>
                </div> */}
                <div className="col-7 col-sm-5">
                    <address>
                    <h5>Our Address</h5>
                    <Row>
                    <Col>
		              Dothraki Street, Westeros<br />
		              Khal Kingdom<br />
		              Drogo State<br />
                      </Col>
                      <Col>
		              <i className="fa fa-phone fa-lg"></i>: +910000000000<br />
		              <i className="fa fa-fax fa-lg"></i>: +911111111111<br />
		              <i className="fa fa-envelope fa-lg"></i>: <a style={{ color: 'rgb(3, 233, 233)'}} href="mail to:dothraki@delivery.net">
                         dothraki@delivery.net</a></Col></Row>
                    </address>
                </div>
                {/* <div className="col-12 col-sm-4 align-self-center">
                    <address>
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                        <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                    </div></address>
                </div> */}
            </div>
            <div className="row justify-content-center">
                <address>             
                <div className="col-auto">
                    <p>© Copyright 2021 Dothraki Delivery</p>
                </div></address>
            </div>
        </div>
    </div>
    );
}

export default Footer;