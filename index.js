
function morningOrMourning() {
  let date = new Date();
  let currentHour = date.getHours()

  console.log(currentHour);
  if (currentHour < 12) {
    document.getElementById("morning-text").innerHTML = "Morning Morning!";
  } else {
    document.getElementById("morning-text").innerHTML = "<span id='mourning'>Mourning</span> Morning!";
  }
  
}
