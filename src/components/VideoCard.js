import React from 'react';

const VideoCard = ({ video }) => {
    // Extract the video ID from the YouTube link
    const videoId = extractVideoId(video.link);

    // Construct the embedded YouTube link
    const embeddedLink = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className='px-4 pt-3'>
            <h5 className="card-title">{video.title}</h5>
            <p className="card-text">{video.description.substring(0, 50) + '...'}</p>
            <iframe
                title="YouTube video player"
                width="100%"
                height="315"
                src={embeddedLink}
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
};

// Function to extract the video ID from the YouTube link
const extractVideoId = (link) => {
    const videoIdRegex = /[?&]v=([^?&]+)/;
    const match = link.match(videoIdRegex);
    return match && match[1];
};


export default VideoCard;
