import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Table() {
  const [list, setList] = useState([]);
  const fetchData = async () => {
    try {
      let getaData = await axios.get("http://localhost:5000/get");
      setList(getaData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const deleteData = async (value) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${value}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="col-lg-12">
        <div class="bd-example">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Movie Nmae</th>
                <th scope="col">Rating</th>
                <th scope="col">Hero</th>
                <th scope="col">Villan</th>
                <th scope="col">Genere</th>
                <th scope="col">Date Time</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {list.map((data, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.moviename}</td>
                    <td>{data.rating}</td>
                    <td>{data.cast[0]}</td>
                    <td>{data.cast[1]}</td>
                    <td>{data.genere}</td>
                    <td>{data.date}</td>
                    <td>
                      <Link
                        to={`/editmoviedata/${data._id}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteData(data._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Table;
