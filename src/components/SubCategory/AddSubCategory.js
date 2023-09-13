import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { WithContext as ReactTags } from "react-tag-input";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import Nav from "../Nav";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const AddSubCategory = () => {
  /* A state hook. It is used to store the data in the state. */
  const [subCategories, setSubCategory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [cat, setCat] = useState();

  /* A hook that is used to fetch data from the database. */
  useEffect(() => {
    db.collection("categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setSubCategory((arr) => [...arr, data]);
          setLoading(false);
        });
      })
      .catch((err) => { });
  }, []);

  const [tags, setTags] = useState([]);

  /* A function that is used to add tags to the input field. */
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const changeCategory = (e) => {
    setCat(e.target.value);
  };

  /**
   * It takes the value of the input field and adds it to the array of sub_subCategories.
   * @param e - event
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    const dataRef = doc(db, "categories", cat);
    await updateDoc(dataRef, {
      sub_category: arrayUnion(...tags),
    }).then(() => {
      toast.success("Sub Categories Added Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  };

  return (
    <>
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
                  Sub Category
                </h4>
                {/* Basic Layout & Basic with Icons */}
                <div className="row">
                  {/* Basic Layout */}
                  <div className="col-xxl">
                    <div
                      className="card mb-4"
                      style={{ background: "transparent", boxShadow: "none" }}
                    >
                      <div className="card-body">
                        <div className="mb-3 col-sm-12">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Select Category
                          </label>
                          <select
                            className="form-select"
                            name="state"
                            required
                            onChange={changeCategory}
                          >
                            <option selected>---------------</option>
                            {loading === true ? (
                              <>
                                <option>Loading subCategories.....</option>
                              </>
                            ) : (
                              <>
                                {subCategories.map((cat, i) => (
                                  <>
                                    <option value={cat.name}>{cat.name}</option>
                                  </>
                                ))}
                              </>
                            )}
                          </select>
                        </div>
                        <div className="row mb-3">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="basic-default-company"
                          >
                            Sub - Category <br />
                            <small className="text-muted">
                              (Add comma ',' after adding Input) <br />
                              Ex. SUB1,
                            </small>
                          </label>
                          <div className="col-sm-10">
                            <ReactTags
                              type="text"
                              classNames={{
                                tags: "tagsClass",
                                tagInput: "tagInputClass",
                                tagInputField: "form-control",
                                selected: "selectedClass",
                                tag: "btn btn-primary",
                              }}
                              id="inputGroupFile02"
                              placeholder="ACME Inc."
                              name="sub_category"
                              tags={tags}
                              delimiters={delimiters}
                              inputFieldPosition="top"
                              handleDelete={handleDelete}
                              handleAddition={handleAddition}
                              handleDrag={handleDrag}
                              autocomplete
                              maxLength="50"
                            />
                          </div>
                          <div className="row justify-content-start col-md-2">
                            <div className="col-sm-2">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={onSubmit}
                              >
                                Send
                              </button>
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
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default AddSubCategory;
