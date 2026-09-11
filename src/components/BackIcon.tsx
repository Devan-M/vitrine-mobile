import Svg, {
  Polygon,
  Rect,
} from 'react-native-svg';

type BackIconProps = {
  color?: string;
};

export default function BackIcon({
  color = '#000000',
}: BackIconProps) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 512.008 512.008"
    >
      <Rect
        x="41.506"
        y="225.946"
        width="400"
        height="55.967"
        fill={color}
      />

      <Polygon
        points="183.325,447.728 0,256 183.325,64.28 223.772,102.96 77.432,256 223.772,409.049"
        fill={color}
      />
    </Svg>
  );
}