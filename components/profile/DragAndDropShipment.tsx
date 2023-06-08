'use client';
import SellersOrders from './SellersOrders';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
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
  shipment,
}: {
  shipment: Array<Shipment>;
}) {
  return (
    <>
      <DragDropContext onDragEnd={(ev) => console.log(ev)}>
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
