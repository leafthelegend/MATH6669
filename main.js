locDiv = document.getElementById("location");
locDiv.onclick = () => {
    locDiv.innerHTML = "Loading...";
    navigator.geolocation.getCurrentPosition((position) => {
      locDiv.innerHTML = '';
      link = document.createElement('a');
        link.href = "https://www.openstreetmap.org/#map=18/"+position.coords.latitude.toString()+"/"+position.coords.longitude.toString();
        link.target = "_blank";
        link.innerHTML = "Your location";
        locDiv.appendChild(link);
    });
  }
// navigator.geolocation.getCurrentPosition((position) => {
//     locDiv.innerHTML = position.coords.latitude.toString()+","+position.coords.longitude.toString();
//   });