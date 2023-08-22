const FirestoreTimestampToDate = ({ seconds, nanoseconds }) => {
    const milliseconds = seconds * 1000 + nanoseconds / 1000000; // Convert to milliseconds
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleDateString();
  
    return <h6>Date: {formattedDate}</h6>;
  };

export default FirestoreTimestampToDate;