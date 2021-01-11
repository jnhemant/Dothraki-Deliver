import ReactStars from "react-rating-stars-component";
import React from "react";


const ratingChanged = (newRating) => {
    console.log(newRating);
};

const RatingStar = (props) => {
    return (
        <div>
            <ReactStars
                count={5}
                // onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
            />
        </div>
    )
}

export default RatingStar;

// render(
//   <ReactStars
//     count={5}
//     onChange={ratingChanged}
//     size={24}
//     activeColor="#ffd700"
//   />,

//   document.getElementById("where-to-render")
// );