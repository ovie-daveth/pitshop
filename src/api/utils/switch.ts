export function saveKeysToLocalStorage(object: any) {
  if (
    !object ||
    !object.reference ||
    !object.company ||
    !object.company.reference
  ) {
    return;
  }

  console.log("sae ley", object)

  sessionStorage.setItem("secret_key", object.reference);
  sessionStorage.setItem("public_key", object.company.reference);
}

export function switchToObject(index: number, data: any[]) {
  if (index < 0 || index >= data.length) {
    console.error("Invalid index");
    return;
  }
  const selectedObject = data;
  saveKeysToLocalStorage(selectedObject);
}
