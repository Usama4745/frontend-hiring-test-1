
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
          setPageCount(response.data.totalCount / 10);
        });
    }
  }, [authtoken])

  return (
    <div className="App">
      <div className='list-container'>
        {callsdata && callsdata.map((call, index) => {
          return (
            <div className='call-item' key={call.id} >
              <div>From {call.from}</div>
              <div>to {call.to}</div>
              <div>direction {call.direction}</div>
              <div>call Type {call.call_type}</div>
              <div>direction {call.direction}</div>
            </div>
          )
        })
        }

      </div>
      <div className='paginations'>
        {pagecount && [...Array(pagecount)].map((item, index) => {
          return (
            <div className='pagination-item' key={index}>
              <div>{index + 1}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
