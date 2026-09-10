import Svg, { Path } from 'react-native-svg';

type AlertIconProps = {
  color?: string;
};

export default function AlertIcon({
  color = '#B91C1C',
}: AlertIconProps) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        opacity={0.1}
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        fill={color}
      />

      <Path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke={color}
        strokeWidth={2}
      />

      <Path
        d="M12 8L12 13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M12 16V15.9888"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}