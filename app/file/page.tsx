'use client';

import { ChangeEventHandler } from 'react';

export default function Files() {
  const changeHandler: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    fetch('/api/files', {
      method: 'POST',
      body: formData,
    });
  };
  return <input type="file" onChange={changeHandler} />;
}
