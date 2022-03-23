import React, { useState, useEffect } from 'react'
import './PostVoteComponent.scss';

function PostVoteComponent(props) {
    const [voteCount, setVoteCount] = useState(0);
    const handleArrowClick = (e) => {
        if (e.target.className === "upArrow") {
            let currVoteCount = voteCount;
            setVoteCount(++currVoteCount);
        } else if (e.target.className === "downArrow") {
            let currVoteCount = voteCount;
            setVoteCount(--currVoteCount);
        }
    }

    return (
        <div className='voteCounter'>
            <img onClick={handleArrowClick} className="upArrow" src="/assets/arrow.png" alt="" />
            <div className="voteCount">
                <p>{voteCount}</p>
            </div>
            <img onClick={handleArrowClick} className="downArrow" src="/assets/arrow.png" alt="" />
        </div>
    )
}

export default PostVoteComponent