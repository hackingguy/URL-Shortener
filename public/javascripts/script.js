function addListener() {
  document
    .querySelector(".shorten-button")
    .addEventListener("click", async () => {
      const data = await fetch("/api/shorten", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          longURL: document.querySelector("input").value
        }),
      });
      const res = await data.json();
      var short = document.querySelector(".short-url a");
      if (res["response"] === true) {
        short.style.color = "#33333385"
        short["href"] = res["shortURL"];
        short.innerHTML = res["shortURL"];
      }
      else {
        short.style.color = "#E81224"
        short.innerHTML = "Error: Invalid URL";
      }
      var enable = document.querySelector(".short-url");
      enable.style.visibility = "visible";
    });
}

addListener();
