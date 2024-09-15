import { Button, Group, Modal } from "@mantine/core"

export function ConfirmDeleteModal({
  opened,
  onClose,
  onConfirm,
  isLoading = false,
}: {
  opened: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}) {
  const handleSubmit = () => {
    onConfirm()
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title={"Подтверждение удаления"}
    >
      <Group grow mt={32}>
        <Button
          loading={isLoading}
          color="var(--mantine-color-primarycolor)"
          size="md"
          onClick={handleSubmit}
        >
          Удалить
        </Button>
        <Button
          disabled={isLoading}
          color="var(--mantine-color-gray-9)"
          size="md"
          variant="outline"
          onClick={onClose}
        >
          Отменить
        </Button>
      </Group>
    </Modal>
  )
}
