import Svg, { Path } from 'react-native-svg';

type AddIconProps = {
  color?: string;
};

export default function AddIcon({
  color = '#FFFFFF',
}: AddIconProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 5V19"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M5 12H19"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}