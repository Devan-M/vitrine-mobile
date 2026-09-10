import Svg, { Path } from 'react-native-svg';

type GearIconProps = {
  color?: string;
};

export default function GearIcon({
  color = '#262627',
}: GearIconProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 15.5A3.5 3.5 0 1 0 12 8.5A3.5 3.5 0 0 0 12 15.5Z"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L19.8 16.9L17.9 19.8L17.8 19.73A1.65 1.65 0 0 0 15.98 19.4L15.75 19.3A1.65 1.65 0 0 0 14.75 20.82V21H9.25V20.82A1.65 1.65 0 0 0 8.25 19.3L8.02 19.4A1.65 1.65 0 0 0 6.2 19.73L6.1 19.8L4.2 16.9L4.27 16.82A1.65 1.65 0 0 0 4.6 15L4.5 14.75A1.65 1.65 0 0 0 3 13.75H2.8V10.25H3A1.65 1.65 0 0 0 4.5 9.25L4.6 9A1.65 1.65 0 0 0 4.27 7.18L4.2 7.1L6.1 4.2L6.2 4.27A1.65 1.65 0 0 0 8.02 4.6L8.25 4.7A1.65 1.65 0 0 0 9.25 3.18V3H14.75V3.18A1.65 1.65 0 0 0 15.75 4.7L15.98 4.6A1.65 1.65 0 0 0 17.8 4.27L17.9 4.2L19.8 7.1L19.73 7.18A1.65 1.65 0 0 0 19.4 9L19.5 9.25A1.65 1.65 0 0 0 21 10.25H21.2V13.75H21A1.65 1.65 0 0 0 19.5 14.75L19.4 15Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}