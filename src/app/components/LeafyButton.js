import { Button } from "@mantine/core";

export default function LeafyButton({variant, children, iconLeft, iconRight}) {
  let color;
  switch (variant) {
    case "primary":
      color = "green.7";
      break;
    case "danger":
      color = "red";
      break;
    default:
      color = "gray.2";
  }
  return (
    <Button 
      color={color}
      autoContrast={true}
      leftSection={iconLeft}
      rightSection={iconRight}
    >
      {children}
    </Button>
  );
}