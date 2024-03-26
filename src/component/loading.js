import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <ReactLoading type={'bars'} color={'black'} height={667} width={375} />
);
 
export default Loading;