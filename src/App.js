import { List } from "phosphor-react";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { db } from "./FirebaseConfig";

function App() {
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    db.collection("categories")
      .get()
      .then((query) => {
        const data = query.size;
        setCategories(data);
      });
  }, []);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-lg-12 col-md-4 order-1">
                  <div className="row">


                    <div className="col-lg-4 col-md-12 col-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/wallet-info.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="cardOpt6"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <List size={24} />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="cardOpt6"
                              >
                                <a className="dropdown-item" href="/Categories">
                                  View More
                                </a>
                              </div>
                            </div>
                          </div>
                          <span>Categories</span>
                          <h3 className="card-title text-nowrap mb-1">
                            {categories}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
