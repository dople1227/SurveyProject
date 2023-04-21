import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import SurveyListTable from './SurveyListTable';

function SurveyList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);



    useEffect(()=>{
        const fetchData = async (page) =>{
            try{
                //요청 시작 시 error와 Surveys 초기화
                setError(null);
                setData(null);                
                
                //loading 상태 true로 변경
                setLoading(true);

                const response = await axios.get(
                    'http://localhost:8000/api/survey/', {params: {page: page}}
                );
                setData(response.data.results);                      
                setTotalPages(Math.ceil(response.data.count / 10));
            }catch (e) {                
                setError(e);
            }
            setLoading(false);
        };
        fetchData();
    },[page]);

    if (!data) return null;
    
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (        
        <div>
            <SurveyListTable 
                data={data}
                loading={loading}
                error={error}
            ></SurveyListTable>            
            <Pagination
                count={totalPages} 
                page={page} 
                onChange={handleChangePage}             
            ></Pagination>
        </div>
        
    );
}

export default SurveyList;