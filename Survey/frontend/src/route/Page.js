import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurveyList from '../list/SurveyList';
import SurveyForm from '../form/SurveyForm';
import SurveyDetail from '../detail/SurveyDetail';
import User from '../user/User';
import Soron from '../soron/Soron';
import PageNotFound from '../exception/PageNotFound';
import Navigation from './Navigation';

function Page() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Soron />} />
        <Route exact path="/list" element={<SurveyList />} />
        <Route path="/form/" element={<SurveyForm />} />
        <Route path="/form/:id" element={<SurveyForm />} />
        <Route path="/detail/:id" element={<SurveyDetail />} />
        <Route path="/user" element={<User />} />
        <Route path="/soron" element={<Soron />} />
        <Route path="" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default Page;
