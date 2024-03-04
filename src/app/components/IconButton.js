import { ActionIcon } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton({icon}) {
  return (
    <ActionIcon
      variant="transparent"
    >
      <FontAwesomeIcon
        icon={icon}
        color="gray" 
        size="sm"
      />
    </ActionIcon>
  )
}