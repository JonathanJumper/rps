import React from 'react';

export default function Toast({message, visible}){
  return (
    <div className={visible ? "toast" : "toast hidden"}>
      {message}
    </div>
  )
}