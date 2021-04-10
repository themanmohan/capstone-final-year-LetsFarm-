console.log("dhjd")

  window.navigator.geolocation.getCurrentPosition((postion) => {
      let lat=postion.coords.latitude;
      let log=postion.coords.longitude
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=c52059e4c1174f868eb6a12a556dc7e5`)
          .then(response => response.json())
          .then(data => getData(data));
      
  },
      (error) => console.log(error)
  )



  const getData = (data) => {
        
  
  }

  const city = document.getElementById("city")
  console.log(city)