import React, { useState } from 'react';
import axios from 'axios';

function Soron() {
  const [formFields, setFormFields] = useState([
    { fieldType: 'radio', title: '', options: [] },
  ]);
  const [formTitle, setFormTitle] = useState('');
}
export default Soron;
