import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import classes from "./style.module.css";
import { Link, withRouter } from "react-router-dom";
import Home from "../HomeWrapper";

class NursesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nurses: [],
      searchedNurses: [],
      keyWord: "",
      isSearching: false,
    };
    this.handleSearchedDoctors = this.handleSearchedDoctors.bind(this);
  }
  handleSearchedDoctors = (e) => {
    console.log(e.target.value);
    const keyWord = e.target.value;
    console.log(keyWord);
    this.setState({
      keyWord,
    });
    if (keyWord == "") {
      this.setState({
        isSearching: false,
      });
    } else {
      this.setState({
        isSearching: true,
      });
      var foundValue = this.state.nurses.filter(
        (obj) => obj.first_name.match(keyWord) || obj.last_name.match(keyWord)
      );

      this.setState({
        searchedNurses: foundValue,
      });
    }
  };
  onUpdate = (nurse) => {
    localStorage.setItem("updateNurse", JSON.stringify(nurse));
    this.props.history.push("/add-nurse");
  };
  onDelete = (id) => {
    Axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteNurse/${id}`)
      .then((response) => {
        console.log("data", response);
        window.location.reload();
      })
      .catch((e) => {
        if (e.response.data) {
          Swal.fire(
            "error",
            `${e.response.data.message}`.toLocaleUpperCase(),
            "error"
          );
        }
      });
  };
  AddDoctorClick = () => {
    localStorage.removeItem("updateDoctor");
  };
  componentDidMount() {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getAllNurses`)
      .then((response) => {
        console.log("data", response);
        this.setState({
          nurses: response.data.data,
        });
      })
      .catch((e) => {
        if (e.response) {
          Swal.fire(
            "error",
            `${e.response.data.message}`.toLocaleUpperCase(),
            "error"
          );
        }
      });
  }
  render() {
    const { nurses, isSearching, searchedNurses } = this.state;
    return (
      <Home>
        <br />
        <h1 style={{ textAlign: "center" }}>Nurse Section</h1>
        <Link to='/add-nurse' onClick={this.AddDoctorClick}>
          {" "}
          <button className={[classes.button, classes.buttonAdd].join(" ")}>
            Add Nurse
          </button>
        </Link>
        <input
          type='text'
          className='form-control-sm float-right'
          placeholder='Search Nurse'
          value={this.state.keyWord}
          onChange={this.handleSearchedDoctors}
        />
        <table className={classes.table} style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className={classes.paddingLeft}></th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {isSearching
              ? searchedNurses &&
                searchedNurses.map((nurse) => (
                  <tr key={nurse._id}>
                    <td className={classes.paddingLeft}></td>
                    <td>{`${nurse.first_name} ${nurse.last_name}`}</td>
                    <td>{nurse.mobile_number}</td>
                    <td>{nurse.address}</td>
                    <td>
                      <button
                        className={[classes.button, classes.updateButton].join(
                          " "
                        )}
                        onClick={() => this.onUpdate(nurse)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className={[classes.button, classes.deleteButton].join(
                          " "
                        )}
                        onClick={() => this.onDelete(nurse._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : nurses &&
                nurses.map((nurse) => (
                  <tr key={nurse._id}>
                    <td className={classes.paddingLeft}></td>
                    <td>{`${nurse.first_name} ${nurse.last_name}`}</td>
                    <td>{nurse.mobile_number}</td>
                    <td>{nurse.address}</td>
                    <td>
                      <button
                        className={[classes.button, classes.updateButton].join(
                          " "
                        )}
                        onClick={() => this.onUpdate(nurse)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className={[classes.button, classes.deleteButton].join(
                          " "
                        )}
                        onClick={() => this.onDelete(nurse._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </Home>
    );
  }
}

export default withRouter(NursesTable);
