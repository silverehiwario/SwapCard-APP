import React, {Component} from "react";
import Webcam from 'react-webcam';
import API from "../../utils/API";
import Modal from "react-modal";
// import Capture from "../Webcam/Capture";
import WebcamCapture from "../WebcamCapture";
import "./AddNewCard.css";
import AlertContainer from 'react-alert';

const style = {
    content : {
        position                   : 'absolute',
        top                        : '20px',
        bottom                     : '20px',
        border                     : '2px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        borderRadius               : '4px',
        outline                    : 'none',
    }
  };

class AddNewCard extends Component {
    state = {
        // selectWebcam: undefined,
        front:"",
        back: ""
    }
    alertOptions = {
        offset: 14,
        position: 'top left',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      }

      showAlert = () => {
        this.msg.show('Added new card', {
          time: 2000,
          type: 'info'
        })
      }
    setRef = (webcam) => {
        this.webcam = webcam;
      }
    // selectWebcam = (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         selectWebcam: true
    //     })
    // }

    captureFront = (e) => {
        e.preventDefault();
        const imageFront = this.webcam.getScreenshot();
        this.setState({
          front: imageFront,
        })
      };

    captureBack = (e) => {
        e.preventDefault();        
        const imageBack = this.webcam.getScreenshot();
        this.setState({
            back: imageBack,
        })
    }; 
    
    //get card details, store in database
    formSubmit = (e) => {
        e.preventDefault();
        const store = e.target.elements.store.value;
        const price = e.target.elements.price.value;
        let fimage = e.target.elements.fimage.value;
        let bimage = e.target.elements.bimage.value;
        // const fimage = e.target.elements.fimage.value;
        // console.log(fimage);
        // const bimage = e.target.elements.bimage.value;
        fimage = fimage.replace(/\//g, "%2F");
        fimage = fimage.replace(/-/g, "^");
        bimage = bimage.replace(/\//g, "%2F");
        bimage = bimage.replace(/-/g, "^");
        let exp = JSON.stringify(e.target.elements.exp.value);
        exp = exp.replace(/-/g, ".")
        API.addNewCard(store, price, exp, fimage, bimage, localStorage.getItem("profile"));
        this.showAlert();       
        let that = this; 
        setTimeout(function() {
            that.props.unselectAddNewCard();
        }, 500)
    }

    render() {
        return(
            <Modal 
                style={style}
                isOpen={!!this.props.selectAddNewCard}
                onRequestClose={this.props.unselectAddNewCard}
            >
                <div>
                    <h2 id="dashFont2">Take picture of front and back, input card details</h2>
                    <hr />
                    <form onSubmit={this.formSubmit}>
                        <div className="row">
                            <div className="col-lg-2">
                                <input type="text" className="form-group" name="store"  placeholder="Store name" required/>
                            </div>
                            <div className="col-lg-2">
                                <input type="text" className="form-group" name="price"  placeholder="Price" required/>
                            </div>
                            <div className="col-lg-2">
                                <input type="date" className="form-group" name="exp"  placeholder="Exp date" required/>
                            </div>   
                            <div className="col-lg-2">
                                <input type="text" className="form-group" name="fimage"  placeholder="fimage URL" accept="image/*"  required/>
                            </div> 
                            <div className="col-lg-2">
                                <input type="text" className="form-group" name="bimage" accept="image/*"   placeholder="bimage URL" required/>
                            </div>                          
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <Webcam
                                    audio={false}
                                    height={350}
                                    ref={this.setRef}
                                    screenshotFormat="image/jpeg"
                                    width={350}
                                />
                            </div>

                            <div className="cardImage col-lg-3">
                                <button className="btn btn-lg" onClick={this.captureFront}>Capture front of Card</button>
                                <br />
                                <img src={this.state.front} alt=""/>
                            </div>

                            <div className="cardImage col-lg-3">
                                <button className="btn btn-lg" onClick={this.captureBack}>Capture back of Card</button>
                                <br />
                                <img src={this.state.back} alt=""/>
                            </div>
                        </div>
                
                        {true ? (
                            <button className="btn btn-lg" type="submit">Submit</button>
                        ): <p>Please capture both front and back of card</p>}
                        <button className="btn btn-lg" onClick={this.props.unselectAddNewCard}>Cancel</button>
                    </form>
                </div>
                <WebcamCapture selectWebcam={this.state.selectWebcam} front={this.state.front} />
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </Modal>
        )
    }
}

export default AddNewCard;