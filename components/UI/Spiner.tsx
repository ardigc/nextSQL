interface Props {
  size?: string;
  color?: 'primary' | 'white';
}

export function Spiner({ size = 'h10 w10', color = 'primary' }: Props) {
  return (
    <div
      className={`border-4 border-transparent ${
        color === 'primary' ? 'border-t-blue-500' : 'border-t-white'
      } rounded-full animate-spin ${size} ease-linear`}
    ></div>
  );
}
