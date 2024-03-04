import { Blockquote } from "@mantine/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircleInfo, faLightbulb, faCircleExclamation, faTriangleExclamation, faFlask } from "@fortawesome/free-solid-svg-icons";

export default function Banner({ variant, children }) {
  let color, icon;

  switch (variant) {
    case "note":
      color = "blue";
      icon = faCircleInfo;
      break;
    case "tip":
      color = "purple";
      icon = faLightbulb;
      break;
    case "important":
      color = "yellow";
      icon = faCircleExclamation;
      break;
    case "warning":
      color = "red";
      icon = faTriangleExclamation;
      break;
    default:
      color = "gray";
      icon = faFlask;
  }

  return (
    <Blockquote 
      radius="lg"
      icon={<FontAwesomeIcon icon={icon} color={color}/>}
      iconSize={20}
      color={color}
    >
      {children}
    </Blockquote>
  );
}