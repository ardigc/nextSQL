export default async function OrderDetail({
  params,
}: {
  params: { shipmentId: number };
}) {
  return <div>{params.shipmentId}</div>;
}
