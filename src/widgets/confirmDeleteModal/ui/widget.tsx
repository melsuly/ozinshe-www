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
          disabled={isLoading}
          color="red"
          size="md"
          variant="outline"
          onClick={onClose}
        >
          Отменить
        </Button>
        <Button
          loading={isLoading}
          color="red"
          size="md"
          onClick={handleSubmit}
        >
          Удалить
        </Button>
      </Group>
    </Modal>
  )
}
