import { View } from "react-native";

type Props = {
  images: { uri: string }[];
  imageIndex: number;
  visible: boolean;
  onRequestClose: () => void;
};

export default function ImageViewing({ visible }: Props) {
  if (!visible) return null;

  return <View accessibilityLabel="Image viewer" />;
}
