'use client';

import { Group, Text, useMantineTheme } from "@mantine/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot } from "@fortawesome/free-solid-svg-icons"

export default function IconText({ icon, text }) {
  const theme = useMantineTheme()
  const aiStyle = icon === faRobot
  return (
    <Group>
      <FontAwesomeIcon icon={icon} color={aiStyle ? theme.colors.green[6] : null} />
      <Text>{text}</Text>
    </Group>
  )
}