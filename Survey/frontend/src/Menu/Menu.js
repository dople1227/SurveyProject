import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurveyList from '../List/SurveyList';
import SurveyForm from '../Add/SurveyForm';
import SurveyDetail from '../Detail/SurveyDetail';
import User from '../User/User';
import Soron from '../Soron/Soron';
import PageNotFound from '../Exception/PageNotFound';
import Navigation from './Navigation';

function Menu(){
    return(
        <Router>
           <Navigation />
            <Routes>
                <Route exact path="/list" element={<SurveyList />} />
                <Route path="/add" element={<SurveyForm />} />
                <Route path="/detail" element={<SurveyDetail />} />
                <Route path="/user" element={<User />} />
                <Route path="/soron" element={<Soron />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default Menu;