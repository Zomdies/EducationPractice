
import React from 'react';

const SearchOutline = (props) =>
{
  const color = props.color === undefined ? "#FFFFFF" : props.color

  return(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill={color} d="M10.75 3.5C14.7541 3.5 18 6.74594 18 10.75C18 12.3912 17.4547 13.9051 16.5353 15.1202L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L15.1202 16.5353C13.9051 17.4547 12.3912 18 10.75 18C6.74594 18 3.5 14.7541 3.5 10.75C3.5 6.74594 6.74594 3.5 10.75 3.5ZM10.75 5.5C7.8505 5.5 5.5 7.8505 5.5 10.75C5.5 13.6495 7.8505 16 10.75 16C13.6495 16 16 13.6495 16 10.75C16 7.8505 13.6495 5.5 10.75 5.5Z"/>
  </svg>
  
  )
}

export default SearchOutline