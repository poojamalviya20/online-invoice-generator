// Negetive
export const onKeyPressEvent = (event: any) => {
  const keyCode = event.keyCode || event.which;
  const keyValue = String.fromCharCode(keyCode);
  if (!new RegExp("[0-9]").test(keyValue)) event.preventDefault();
  return;
};
