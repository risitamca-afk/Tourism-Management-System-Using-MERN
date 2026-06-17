import React from 'react'
import './Newcard.css'
import cardimg1 from "../../assets/Top10Places/1st.jpg";
import cardimg2 from "../../assets/Top10Places/AMSTERDAM.jpg";
import cardimg3 from "../../assets/Top10Places/Singapore.jpg";
import cardimg4 from "../../assets/Top10Places/eiffel-tower-parrise.jpg";
import cardimg5 from "../../assets/Top10Places/gondola-ride-in-autumn-in-kashmir-2023-10-18t174214.790-min.png";
import cardimg6 from "../../assets/Top10Places/hawa_mahal.jpg";
import cardimg7 from "../../assets/Top10Places/humayun-s-tomb.jpg";
import cardimg8 from "../../assets/Top10Places/kashmir.jpg";
import cardimg9 from "../../assets/Top10Places/nepal-tour.jpg";
import cardimg10 from "../../assets/Top10Places/pisa.png";
import cardimg11 from "../../assets/Top10Places/swarna mandir.png";
import cardimg12 from "../../assets/Top10Places/Vietnam.jpg";


const Newcard = () => {
    return (
        <div className='outer-div'>
            <div className="inner-div">
                {data.map((items) => (
                    <div className="card">
                        <div className="cardimg">
                            <img src={items.img} alt="card-images" />
                        </div>
                        <div className="cardtext">
                            <h5>{items.name}</h5>
                        </div>
                    </div>

                )
                )}

            </div>

        </div>
    )
}

const data = [
    {
        name: `Venice,Italy`,
        img: cardimg1
    },
    {
        name: `Amsterdam, Netherlands`,
        img: cardimg2
    },
    {
        name: `Singapore`,
        img: cardimg3
    },
    {
        name: `Paris, France`,
        img: cardimg4
    }, {
        name: `Maldives`,
        img: cardimg5
    },
    {
        name: `Jaipur, India`,
        img: cardimg6
    },

    {
        name: `Humayun's Tomb`,
        img: cardimg7
    },
    {
        name: `Kashmir`,
        img: cardimg8
    },
    {
        name: `Nepal Tour`,
        img: cardimg9
    },
    {
        name: `Pisa`,
        img: cardimg10
    }, {
        name: `Swarna Mandir`,
        img: cardimg11
    },
    {
        name: `Vietnam`,
        img: cardimg12
    },
]
export default Newcard

