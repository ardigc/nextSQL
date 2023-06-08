'use client';
import SellersOrders from './SellersOrders';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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
  requested,
  confirmed,
  shipped,
  received,
}: {
  requested: Array<Shipment>;
  confirmed: Array<Shipment>;
  shipped: Array<Shipment>;
  received: Array<Shipment>;
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
                  requested &&
                    requested.map((ship) => <SellersOrders shipment={ship} />)

                  // <DragAndDropShipment shipment={requested}/>
                }
              </div>
            )}
          </Droppable>
          <div className="flex flex-col">
            Pendientes de envio
            {confirmed &&
              confirmed.map((ship) => <SellersOrders shipment={ship} />)}
          </div>
          <div className="flex flex-col">
            Enviados
            {shipped &&
              shipped.map((ship) => <SellersOrders shipment={ship} />)}
          </div>
          <div className="flex flex-col">
            Finalizados
            {received &&
              received.map((ship) => <SellersOrders shipment={ship} />)}
          </div>
        </div>
      </DragDropContext>
    </>
  );
}
