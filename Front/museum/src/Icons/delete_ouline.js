
import React from 'react';

const DeleteOutline = (props) =>
{
  const color = props.color === undefined ? "#FFFFFF" : props.color

  return(<svg onClick={props.onClick} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill={color} d="M14 1.5C16.3764 1.5 17.9252 2.73358 18.4217 4.99953L24.5 5C25.0523 5 25.5 5.44772 25.5 6C25.5 6.55228 25.0523 7 24.5 7H23.395L21.7827 22.3141C21.622 23.8409 20.3345 25 18.7992 25H9.20079C7.66551 25 6.37799 23.8409 6.21727 22.3141L4.605 7H3.5C2.94772 7 2.5 6.55228 2.5 6C2.5 5.44772 2.94772 5 3.5 5L9.57826 4.99953C10.0748 2.73358 11.6236 1.5 14 1.5ZM21.383 7H6.616L8.20628 22.1047C8.25985 22.6136 8.68903 23 9.20079 23H18.7992C19.311 23 19.7401 22.6136 19.7937 22.1047L21.383 7ZM14 9C14.5523 9 15 9.44772 15 10V20C15 20.5523 14.5523 21 14 21C13.4477 21 13 20.5523 13 20V10C13 9.44772 13.4477 9 14 9ZM18.0499 9.00125C18.6015 9.02883 19.0263 9.49834 18.9988 10.0499L18.4988 20.0499C18.4712 20.6015 18.0017 21.0263 17.4501 20.9988C16.8985 20.9712 16.4737 20.5017 16.5012 19.9501L17.0012 9.95006C17.0288 9.39847 17.4983 8.97367 18.0499 9.00125ZM9.95006 9.00125C10.5017 8.97367 10.9712 9.39847 10.9988 9.95006L11.4988 19.9501C11.5263 20.5017 11.1015 20.9712 10.5499 20.9988C9.99834 21.0263 9.52883 20.6015 9.50125 20.0499L9.00125 10.0499C8.97367 9.49834 9.39847 9.02883 9.95006 9.00125ZM14 3.5C12.7333 3.5 12.0003 3.95411 11.6478 4.99956H16.3522C15.9997 3.95411 15.2667 3.5 14 3.5Z"/>
  </svg>  
  )
}

export default DeleteOutline