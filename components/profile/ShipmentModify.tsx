'use client';

import { MouseEventHandler, useState } from 'react';

export default function ShipmenModify({
  shipment,
}: {
  shipment: { id: number; shipment_status: string };
}) {
  const [selectedStatus, setSelectedStatus] = useState(
    shipment.shipment_status
  );
  console.log(selectedStatus);
  const clickHandle: MouseEventHandler<HTMLButtonElement> = (ev) => {};
  return (
    <div>
      <select
        defaultValue={selectedStatus}
        onChange={(ev) => setSelectedStatus(ev.target.value)}
      >
        <option value={'requested'}>requested</option>
        <option value={'confirmed'}>confirmed</option>
        <option value={'shipped'}>shipped</option>
        <option value={'received'}>received</option>
      </select>
      <button
        onClick={clickHandle}
        className="px-1 my-2 border bg-blue-400 rounded-3xl ml-7"
      >
        Cambiar estado
      </button>
    </div>
  );
}
