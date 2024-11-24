document.querySelector("#result-example").addEventListener("click", async () => {
  if (
    document.querySelector("#result").style.display === "none" ||
    document.querySelector("#result").style.display === ""
  ) {
    document.querySelector("#result").style.display = "block";

    const value = document.querySelector("#prompts").value;
    for (const promptElement of promptList) {
      //document.querySelector('#prompt').id
      //document.querySelector('#prompt').name
      if (value == promptElement.id) {
        //console.log(document.querySelector('#prompt').name);
        document.querySelector("#result").value = promptElement.result;
        break;
      }
    }
  } else {
    document.querySelector("#result").style.display = "none";
  }
});
