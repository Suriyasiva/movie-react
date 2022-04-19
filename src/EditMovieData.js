import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
function CreateMovieData() {
  let navigate = useNavigate();
  let params = useParams();
  const formik = useFormik({
    initialValues: {
      moviename: "",
      rating: "",
      cast: "",
      genere: "",
      date: "",
    },
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:5000/editdata/${params.id}`, {
          ...values,
          cast: values.cast.split(","),
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  const setData = async () => {
    try {
      let singleData = await axios.get(
        `http://localhost:5000/singledata/${params.id}`
      );
      delete singleData.data._id;
      formik.setValues(singleData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-lg-8">
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div>
                    <label className="form-label">Movie Name</label>
                    <input
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
              <div className="d-grid mt-2 gap-2">
                <input className="btn btn-primary" type="submit"></input>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateMovieData;
