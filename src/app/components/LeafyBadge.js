import { Badge, Chip, Text } from "@mantine/core";

export default function LeafyBadge({ text, color }) {
  let backgroundColor, textColor;
  switch (color) {
    case "green":
      backgroundColor = "green.2";
      textColor = "green.7";
      break;
    case "yellow":
      backgroundColor = "yellow.2";
      textColor = "yellow.7";
      break;
    case "red":
      backgroundColor = "red.1";
      textColor = "red.7";
      break;
    case "blue":
      backgroundColor = "blue.1";
      textColor = "blue.6";
      break;
    default:
      backgroundColor = "gray.1";
      textColor = "gray.6";
  }
  return (
    <Badge
      size="xs"
      color={backgroundColor}
      autoContrast={false}
    >
      <Text c={textColor} size="xs">{text}</Text>
    </Badge>
  );
}