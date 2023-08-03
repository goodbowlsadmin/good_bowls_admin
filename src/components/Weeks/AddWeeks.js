import React, { useState, useEffect } from 'react';
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import FloatingButton from './FloatingButton';
import Card from './Card';
import Nav from "../Nav";
import { toast } from 'react-hot-toast';

const AddWeeks = () => {
  const [weekList, setWeekList] = useState([]);

  useEffect(() => {
    // Fetch the data from Firestore and update the weekList state.
    const fetchData = async () => {
      try {
        const snapshot = await db.collection('weeks').get();
        const weeksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setWeekList(weeksData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleAddWeek = async () => {
    try {
      const newWeekNumber = weekList.length + 1;
      await db.collection('weeks').doc(`Week ${newWeekNumber}`).set({ id: `Week ${newWeekNumber}`, name: `Week ${newWeekNumber}` });
      toast.success("Week added Successfully");
      setWeekList([...weekList, { name: `Week ${newWeekNumber}` }]);
      window.location.reload();
    } catch (error) {
      console.error('Error adding week: ', error);
    }
  };

  const handleDeleteWeek = async (id) => {
    try {
      await db.collection('weeks').doc(id).delete();
      setWeekList(weekList.filter((week) => week.id !== id));
      toast.error("Week Deleted Successfully");
      window.location.reload();
    } catch (error) {
      console.error('Error deleting week: ', error);
    }
  };

  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> Add
                  Week
                </h4>
                <div style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
                  <FloatingButton onClick={handleAddWeek} />
                </div>
                <div>
                  {weekList.map((week) => (
                    <Card key={week.id} week={week.name} onDelete={() => handleDeleteWeek(week.id)} />
                  ))}
                </div>
              </div>{/* content wrapper */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWeeks;
