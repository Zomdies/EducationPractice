
import React from 'react';

const AddCirleOutline = (props) =>
{
  const color = props.color === undefined ? "#FFFFFF" : props.color

  return(<svg onClick={props.onClick} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill={color} d="M14 2C20.6274 2 26 7.37258 26 14C26 20.6274 20.6274 26 14 26C7.37258 26 2 20.6274 2 14C2 7.37258 7.37258 2 14 2ZM14 4C8.47715 4 4 8.47715 4 14C4 19.5228 8.47715 24 14 24C19.5228 24 24 19.5228 24 14C24 8.47715 19.5228 4 14 4ZM14 8C14.5523 8 15 8.44772 15 9V13H19C19.5523 13 20 13.4477 20 14C20 14.5523 19.5523 15 19 15H15V19C15 19.5523 14.5523 20 14 20C13.4477 20 13 19.5523 13 19V15H9C8.44772 15 8 14.5523 8 14C8 13.4477 8.44772 13 9 13H13V9C13 8.44772 13.4477 8 14 8Z"/>
  </svg>  
  )
}

export default AddCirleOutline