import React from 'react';

const VideoCard = ({ video }) => {
    return (
        <video key={video} width="100%" height="315" controls>
            <source src={video} type="video/mp4" />
            <source src={video} type="video/webm" />
            <source src={video} type="video/ogg" />
            <source src={video} type="video/quicktime" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoCard;
