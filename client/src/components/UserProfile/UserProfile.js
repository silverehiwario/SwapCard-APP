import React, {Component} from "react";
import "./UserProfile.css";
// import Header from "../Header";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Carousel from "../Carousel";
import AddNewCard from "../AddNewCard";
import Auth from "../../Auth/Auth.js";
import CarouselNotify from "../CarouselNotify";

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.auth = new Auth();
    }
    state = {
        fullname: "",
        email: "",
        selectAddNewCard: undefined
    }
    
    logout() {
        this.auth.logout();
      }

    componentDidMount() {
        API.getUserProfile(localStorage.getItem("profile"))
        .then(res => {
            // console.log(res.data);
            this.setState({
                fullname: res.data.fullname,                
                email: res.data.email
            })
        }
        ).catch(err => console.log(err));
    };

    selectAddNewCard = () => {
        this.setState({
            selectAddNewCard: true
        })
    }

    unselectAddNewCard = () => {
        this.setState({
            selectAddNewCard: false
        })
    }
    render() {
        return (
            <div>
                {/* header */}
                <div className="jumbotron text-center">
                    <h1>SwapCard Dashboard</h1>
                    {/* creat button to test userprofile page route */}
                    <button className={window.location.pathname === "/" ? "active" : "btn btn-lg"}>
                        <Link to="/" >Back to homepage</Link>
                    </button>
                    {localStorage.getItem("profile") ? <p id="dashFont">Logged in as: {localStorage.getItem("profile")}</p> : ""}

                    {/* <button className={localStorage.getItem("profile") ? "active" : ""}>
                        <Link to="/">Logout</Link>
                    </button> */}

                    {/* <button onClick={this.logout}> Logout </button> */}
                </div>
                {/* end header */}
                <div className="container">
                    <h2 id="titleNames">Your Information</h2>
                    <hr />
                    {/* your information */}
                    <div className="row">
                        <div className="col-lg-5">
                            <p>Name: {this.state.fullname} </p>
                            <p>Email Address:{this.state.email} </p>
                        </div>
                        {/* <div className="col-lg-5">
                            <p>You've got an order </p>
                        </div> */}
                    </div>

                    {/* Notification start here */}
                    <h2 id="titleNames">Cards Notification</h2>
                    <hr />
                    
                    <div className="row">
                        <div className="col-lg-12">
                            <CarouselNotify />
                        </div>
                    </div>


                    {/* end card notification */}
                    <h2 id="titleNames">Cards Control</h2>
                    <hr />
                    <div className="row">
                        <div>
                            <button className="btn btn-success btn-lg" onClick={this.selectAddNewCard} >Add new Card</button>
                            {/* <button className="btn btn-danger">Click on card to remove</button> */}
                        </div>
                        <div>
                            <Carousel cards={this.props.cards} />
                        </div>
                    </div>
                
                </div>
                <AddNewCard unselectAddNewCard={this.unselectAddNewCard} selectAddNewCard={this.state.selectAddNewCard}/>
                           
            </div>
        )
    }
}

export default UserProfile;