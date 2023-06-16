'use client';
import { DragEventHandler, useState } from 'react';
import SellersOrders from './SellersOrders';
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { Toaster, toast } from 'react-hot-toast';
interface Shipment {
  id: number;
  order_id: number;
  seller_id: number;
  shipment_status: string;
  cart_id: number;
  created_at: Date;
  adress: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
}
export default function DragAndDropShipment({
  shipmentBeta,
}: {
  shipmentBeta: Array<Shipment>;
}) {
  const [shipment, setShipment] = useState(shipmentBeta);
  const dragEndHandle: OnDragEndResponder = async (ev) => {
    console.log(ev);

    if (
      ev.destination &&
      ev.source.droppableId !== ev.destination.droppableId
    ) {
      setShipment((prev) =>
        prev.map((item) => {
          if (item.id === parseInt(ev.draggableId)) {
            return { ...item, shipment_status: ev.destination!.droppableId };
          }
          return item;
        })
      );
      // l
      const shipmentId = ev.draggableId;
      const selectedStatus = ev.destination.droppableId;
      const notify = toast.loading('Loading...');
      const response = await fetch('/api/profile/seller/shipment', {
        method: 'PATCH',
        body: JSON.stringify({ selectedStatus, shipmentId }),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        console.log(response);
        toast.success('Modificado correctamente', { id: notify });
      } else if (!response.ok) {
        toast.error('Intentalo de nuevo', { id: notify });
      }
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={dragEndHandle}>
        <Toaster />
        <div className="grid grid-cols-4">
          <Droppable droppableId="requested">
            {(droppableProvider) => (
              <div
                {...droppableProvider.droppableProps}
                ref={droppableProvider.innerRef}
                className="flex flex-col"
              >
                Pendientes de recepcion
                {
                  shipment
                    .filter((ship) => ship.shipment_status === 'requested')
                    .map((ship, index) => (
                      <Draggable
                        key={ship.id}
                        draggableId={`${ship.id}`}
                        index={index}
                      >
                        {(draggableProvided) => (
                          <SellersOrders
                            draggableProvided={draggableProvided}
                            shipment={ship}
                          />
                        )}
                      </Draggable>
                    ))

                  // <DragAndDropShipment shipment={requested}/>
                }
                {droppableProvider.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="confirmed">
            {(droppableProvider) => (
              <div
                {...droppableProvider.droppableProps}
                ref={droppableProvider.innerRef}
                className="flex flex-col"
              >
                Pendientes de envio
                {shipment
                  .filter((ship) => ship.shipment_status === 'confirmed')
                  .map((ship, index) => (
                    <Draggable
                      key={ship.id}
                      draggableId={`${ship.id}`}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <SellersOrders
                          draggableProvided={draggableProvided}
                          shipment={ship}
                        />
                      )}
                    </Draggable>
                  ))}
                {droppableProvider.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="shipped">
            {(droppableProvider) => (
              <div
                {...droppableProvider.droppableProps}
                ref={droppableProvider.innerRef}
                className="flex flex-col"
              >
                Enviados
                {shipment
                  .filter((ship) => ship.shipment_status === 'shipped')
                  .map((ship, index) => (
                    <Draggable
                      key={ship.id}
                      draggableId={`${ship.id}`}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <SellersOrders
                          draggableProvided={draggableProvided}
                          shipment={ship}
                        />
                      )}
                    </Draggable>
                  ))}
                {droppableProvider.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="received">
            {(droppableProvider) => (
              <div
                {...droppableProvider.droppableProps}
                ref={droppableProvider.innerRef}
                className="flex flex-col"
              >
                Finalizados
                {shipment
                  .filter((ship) => ship.shipment_status === 'received')
                  .map((ship, index) => (
                    <Draggable
                      key={ship.id}
                      draggableId={`${ship.id}`}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <SellersOrders
                          draggableProvided={draggableProvided}
                          shipment={ship}
                        />
                      )}
                    </Draggable>
                  ))}
                {droppableProvider.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}
