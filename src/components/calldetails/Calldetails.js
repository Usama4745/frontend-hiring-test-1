import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Calldetails = (props) => {
    const params = useParams()
    const [calldata, setCallData] = useState({});

    useEffect(() => {
        const id = params.id;
        console.log(params.id)
        const authtoken=localStorage.getItem('authtoken')
        console.log("authtoken")
        console.log(authtoken)
        console.log(id,"id");
        let axiosConfig = {
            headers: {
              "Authorization": "Bearer " + authtoken,
            }
          };
        axios.get('https://frontend-test-api.aircall.io/calls/'+id, axiosConfig)
        .then(response => {
            setCallData(response.data);
        });
    },[])
    return (

        <div className='call-desc'>
            <div className='call-desc-header'>call type: <label>{calldata.call_type}</label></div>
            <div className='call-desc-header'>Created at: <label>{calldata.created_at}</label></div>
            <div className='call-desc-header'>direction: <label>{calldata.direction}</label></div>
            <div className='call-desc-header'>duration: <label>{calldata.duration}</label></div>
            <div className='call-desc-header'>from: <label>{calldata.from}</label></div>
            <div className='call-desc-header'>is archived: <label>{calldata.is_archived}</label></div>
            <div className='call-desc-header'>to: <label>{calldata.to}</label></div>
            <div className='call-desc-header'>via: <label>{calldata.via}</label></div>
        </div>

    )
}
