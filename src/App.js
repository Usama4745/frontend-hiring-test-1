
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HashRouter as Router, Routes, Route, withRouter } from "react-router-dom";
import { Calldetails } from "./components/calldetails/Calldetails";
import {Calllist} from './components/calllist/Calllist';
function App() {
  const [authtoken, setAuthtoken] = useState("");
  const [callsdata, setCallsData] = useState([]);
  const [callscount, setCallsCount] = useState(0);
  const [pagecount, setPageCount] = useState(0);

  useEffect(() => {
    axios.post('https://frontend-test-api.aircall.io/auth/login', { "username": "test", "password": "test" })
      .then(response => {
        console.log(response.data.access_token);
        setAuthtoken(response.data.access_token);

      });
    if (authtoken) {
      let axiosConfig = {
        headers: {
          "Authorization": "Bearer " + authtoken,
        }
      };
      axios.get('https://frontend-test-api.aircall.io/calls?offset=1&limit=10', axiosConfig)
        .then(response => {
          console.log(response.data);
          setCallsData(response.data.nodes);
          setCallsCount(response.data.totalCount);
          console.log(response.data.totalCount);

          console.log(response.data.totalCount / 10)
          const pagenumbers = Math.round(response.data.totalCount / 10);
          setPageCount(pagenumbers);
        });
    }
  }, [authtoken])

  const getcalls = (pagenumber) => {
    console.log(pagenumber);
    let axiosConfig = {
      headers: {
        "Authorization": "Bearer " + authtoken,
      }
    };
    axios.get('https://frontend-test-api.aircall.io/calls?offset=' + pagenumber + '&limit=10', axiosConfig)
      .then(response => {
        console.log(response.data);
        setCallsData(response.data.nodes);
        setCallsCount(response.data.totalCount);
        console.log(response.data.totalCount);

        console.log(response.data.totalCount / 10)
        const pagenumbers = Math.round(response.data.totalCount / 10);
        setPageCount(pagenumbers);

      });
  }
  
  return (

    < Router >


      <Routes>
        <Route
          exact
          path="/"
          element={

            <Calllist/>
          }
        />
        <Route
          exact
          path="/details/:id"
          element={<Calldetails />} />
      </Routes>
    </Router>
  );
}

export default App;
