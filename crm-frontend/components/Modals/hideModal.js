export function hideModal(id) {
  const modal = document.getElementById(id);
  // eslint-disable-next-line no-undef
  const modalInstance = bootstrap.Modal.getInstance(modal);

  modalInstance.hide();
}
