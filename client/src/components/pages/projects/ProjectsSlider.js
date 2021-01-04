import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default class ProjectsSlider extends Component {

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          {this.props.website.map((image, index) => (
            <div  key={index}>
              <img className="sliderImg" src={image} alt=""/>
            </div>
          ))}
          {/* <div>
            <img className="sliderImg" src="images/website-one1.png" alt=""/>
          </div>
          <div>
            <img className="sliderImg" src="images/website-one2.png" alt=""/>
          </div>
          <div>
            <img className="sliderImg" src="images/website-one3.png" alt=""/>
          </div> */}
        </Slider>
      </div>
    );
  }
}