interface Props {
  size?: number;
  color?: 'primary' | 'white';
}

export function Spiner({ size = 20, color = 'primary' }: Props) {
  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` }}
      className={`border-4 border-transparent ${
        color === 'primary' ? 'border-t-blue-500' : 'border-t-white'
      } rounded-full animate-spin  ease-linear`}
    ></div>
  );
}
