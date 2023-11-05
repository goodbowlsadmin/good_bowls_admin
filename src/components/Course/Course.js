import React from "react";
import Header from "../Header";
import Nav from "../Nav";
import getAllDocumentNames from '../../helpers/name';

const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

export const Course = () => {
  const [weeks, setWeeks] = React.useState([]);

  React.useEffect(() => {
    const fetchDocumentNames = async () => {
      const collectionName = 'weeks';
      const names = await getAllDocumentNames(collectionName);
      setWeeks(names);
    };
    fetchDocumentNames();
  }, []);


  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Header />
        <div className="layout-page">
          <Nav />
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
              <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> View
              Course
            </h4>
            <br />
            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
              {weeks.map((cat, index) => (
                <>
                  <h2 className="card-header w-100" key={index}>
                    {cat}
                  </h2>
                  {days.map((data, index) => (
                    <a href={`/Course/${cat}/${data}`} key={index}>
                      <div className="col">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">
                              {data}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
