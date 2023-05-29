interface Adress {
  id: number;
  user_id: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
  marked_as_default: Date;
}
export default function AddressChange({ adress }: { adress: Array<Adress> }) {
  return (
    <div>
      {adress.map((adress) => (
        <div> Hola</div>
      ))}
    </div>
  );
}
