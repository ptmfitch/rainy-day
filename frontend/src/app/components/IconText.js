import { Group, Text } from "@mantine/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function IconText({ icon, text }) {
  return (
    <Group>
      <FontAwesomeIcon icon={icon} />
      <Text>{text}</Text>
    </Group>
  )
}