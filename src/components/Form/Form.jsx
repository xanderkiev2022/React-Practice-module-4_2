import { useState } from 'react';

export const InputValue = ({changeSearch}) => {
  const [text, setText] = useState('');

  const takeValueInput = ({ target }) => {
    setText(target.value);
    console.log(target.value);
  };

  const handelSubmit = e => {
    e.preventDefault();
    changeSearch(text);
    setText('');
  };

  return (
    <form onSubmit={handelSubmit}>
      <input type="text" value={text} onChange={takeValueInput} />
      <button> Search</button>
    </form>
  );
};
