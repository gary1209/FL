export const AddKeyHandler = (handler: (key: string, down: boolean) => void) => {
  document.addEventListener('keydown', (e) => handler(e.key, true ));
  document.addEventListener('keyup'  , (e) => handler(e.key, false));
};
