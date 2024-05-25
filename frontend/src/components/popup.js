/* eslint-disable react/display-name */
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
);