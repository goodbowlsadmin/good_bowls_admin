import React from 'react';

const VideoCard = ({ video }) => {
    return (
        <iframe
            title="YouTube video player"
            width="100%"
            height="315"
            src={video}
            frameBorder="0"
            allowFullScreen
        >
        </iframe>
    );
};

export default VideoCard;
