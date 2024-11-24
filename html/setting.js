(async () => {
  const { floatingIconCheckboxChecked } = await chrome.storage.local.get("floatingIconCheckboxChecked");
  if (floatingIconCheckboxChecked !== undefined) {
    document.querySelector("#floating-icon-checkbox").checked = floatingIconCheckboxChecked;
  }
})();

//

document.querySelector("#floating-icon-checkbox").addEventListener("change", async () => {
  const isChecked = this.checked;
  await chrome.storage.local.set({ floatingIconCheckboxChecked: isChecked });
});
