//initialize socket.io
const socket = io(); //connect to socket.io server

//if browser support geoloaction,watch position to track

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      //emit location to server
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.error("Error getting location: ", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0, //no caching
      timeout: 5000,
    }
  );
}


 const map=L.map("mapbox").setView([0,0],10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
attribution:"Rajan Aryal"
}).addTo(map)

const markers={}

//receive location from server and set view to location
socket.on("receive-location",(data)=>{
const{id,latitude,longitude}=data;
map.setView([latitude,longitude],16);
if(markers[id]){
    markers[id].setLatLng([latitude,longitude])
}
else{
  markers[id]=L.marker([latitude,longitude]).addTo(map).bindPopup(`User ID: ${id}`).openPopup()
}

})

socket.on("user-disconnected",(id)=>{
if(markers[id]){
  map.removeLayer(markers[id])
  delete markers[id]
}
})