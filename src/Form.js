import React from "react";
import Table from "./Table";
import "./App.css";
import { useFormik } from "formik";
import axios from "axios";

function Form(props) {
  const formik = useFormik({
    initialValues: {
      moviename: "",
      rating: "",
      cast: "",
      genere: "",
      date: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("http://localhost:5000/post", {
          ...values,
          cast: values.cast.split(","),
        });
        alert("posted successfully");
      } catch (error) {
        console.log(error);
      }
      resetForm({ values: "" });
    },
    validate: (values) => {
      const errors = {};
      if (!values.moviename) {
        errors.moviename = <span style={{ color: "red" }}>required</span>;
      }
      if (!values.rating) {
        errors.rating = <span style={{ color: "red" }}>required</span>;
      }
      if (!values.cast) {
        errors.cast = <span style={{ color: "red" }}>required</span>;
      }
      if (!values.genere) {
        errors.genere = <span style={{ color: "red" }}>required</span>;
      }
      if (!values.date) {
        errors.date = <span style={{ color: "red" }}>required</span>;
      }
      return errors;
    },
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div>
                    <label className="form-label">Movie Name</label>
                    <input
                      placeholder="Enter Movie Name"
                      type="text"
                      name="moviename"
                      onChange={formik.handleChange}
                      value={formik.values.moviename}
                      className="form-control"
                    ></input>
                    {formik.errors.moviename ? (
                      <div>{formik.errors.moviename}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>
                    <label className="form-label">Rating</label>
                    <input
                      type="number"
                      placeholder="Enter Movie Rating"
                      name="rating"
                      onChange={formik.handleChange}
                      value={formik.values.rating}
                      className="form-control"
                    ></input>
                    {formik.errors.rating ? (
                      <div>{formik.errors.rating}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div>
                    <label className="form-label">Cast</label>
                    <input
                      type="text"
                      placeholder="Hero Name , Villan Name"
                      onChange={formik.handleChange}
                      value={formik.values.cast}
                      name="cast"
                      className="form-control"
                    ></input>
                    {formik.errors.cast ? (
                      <div>{formik.errors.cast}</div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div>
                    <label className="form-label">Genere</label>
                    <input
                      type="text"
                      placeholder="Genere"
                      onChange={formik.handleChange}
                      value={formik.values.genere}
                      name="genere"
                      className="form-control"
                    ></input>
                    {formik.errors.genere ? (
                      <div>{formik.errors.genere}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div>
                    <label className="form-label">Date</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      placeholder="Date and Time"
                      name="date"
                      onChange={formik.handleChange}
                      value={formik.values.date}
                    ></input>
                    {formik.errors.date ? (
                      <div>{formik.errors.date}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="d-grid mt-2">
                <input className="btn btn-primary" type="submit"></input>
              </div>
            </form>
          </div>
          {/* tables */}
          <Table></Table>
        </div>
      </div>
    </>
  );
}

export default Form;
