var elList = document.querySelector(".poke__list")
var elForm =document.querySelector(".poke__form")
var elInputName = document.querySelector(".poke__input--name")
var elInputWeigth = document.querySelector(".poke__input--weigth")
var elInputHeigth = document.querySelector(".poke__input--heigth")
var elInputNameSort = document.querySelector(".poke__input--name-sort")



function renderPokemons(data, elInputNameValue) {
  elList.innerHTML = "";
  data.forEach(function(item) {
    var liElement = document.createElement("li");
    var spanWeigthElement = document.createElement("span");
    var spanHeigthElement = document.createElement("span");
    var spanEggsElement = document.createElement("span");
    var spanSparwElement = document.createElement("span");
    var pokeFlexElement = document.createElement("div");
    var pokeWHElement = document.createElement("div");
    var pokeEggSparwElement = document.createElement("div");
    var pokeImgElement = document.createElement("img");
    var pokeNameElement = document.createElement("p")
    
    pokeImgElement.classList.add("poke__img")
    pokeImgElement.setAttribute("src", `${item.img}`);
    pokeImgElement.setAttribute("alt", `${item.name}`);
    
    pokeImgElement.width = "150";
    pokeImgElement.height = "100"
    
    spanWeigthElement.textContent ="weight" + ": " + `${item.weight}`;
    
    spanHeigthElement.textContent = "height" + ": " + `${item.height}`;
    
    spanEggsElement.textContent = "Egg" + ": " + `${item.egg}`;
    
    spanSparwElement.textContent = "Spawn time" + ": " + `${item.spawn_time}`;
  
    
    // highlight name and name
    pokeNameElement.classList.add("poke__name")
    if (elInputNameValue) {
      console.log(elInputNameValue);
      const regex = new RegExp(elInputNameValue, "gi")
      const marked = item.name.replace(regex, `<mark class="marked">$&</mark>`);

      pokeNameElement.innerHTML = marked
    }else {
      pokeNameElement.innerHTML = item.name
    }
    
    
    pokeWHElement.classList.add("poke__wh")
    pokeWHElement.appendChild(spanHeigthElement);
    pokeWHElement.appendChild(spanWeigthElement);
    
    pokeEggSparwElement.classList.add("poke__egs")
    pokeEggSparwElement.appendChild(spanSparwElement);
    pokeEggSparwElement.appendChild(spanEggsElement);
    
    pokeFlexElement.classList.add("poke__spans");
    pokeFlexElement.appendChild(pokeWHElement);
    pokeFlexElement.appendChild(pokeEggSparwElement);
    
    liElement.classList.add("poke__item");
    liElement.appendChild(pokeImgElement);
    liElement.appendChild(pokeFlexElement);
    liElement.appendChild(pokeNameElement);
    
    elList.append(liElement);
    
  });
}
renderPokemons(pokemons);




elInputName.addEventListener("keyup", function() {
  const elInputNameValue = elInputName.value.trim().toLowerCase();
  const search__key = pokemons.filter(function(item) {
    return item.name.toLowerCase().includes(elInputNameValue)
  })
  renderPokemons(search__key, elInputNameValue);
})


elInputWeigth.addEventListener("change", evt=> {
  evt.preventDefault();
  const sortWeight = pokemons.sort((a, b) => {
    return a.weight - b.weight
  })
  renderPokemons(sortWeight)
})

elInputHeigth.addEventListener("change", evt=> {
  evt.preventDefault();
  const sortHeght = pokemons.sort((a, b) => {
    return a.height - b.height
  })
  renderPokemons(sortHeght)
})

elInputNameSort.addEventListener("change", evt=> {
  evt.preventDefault()
  const sortName = pokemons.sort((a, b) => {
    return a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0)
  })
  renderPokemons(sortName)
})






// background gradiant

var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient()
  {
    
    if ( $===undefined ) return;
    
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];
    
    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb("+r1+","+g1+","+b1+")";
    
    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb("+r2+","+g2+","+b2+")";
    
    $('#gradient').css({
      background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
        background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
        
        step += gradientSpeed;
        if ( step >= 1 )
        {
          step %= 1;
          colorIndices[0] = colorIndices[1];
          colorIndices[2] = colorIndices[3];
          
          //pick two new target color indices
          //do not pick the same as the current one
          colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
          colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
          
        }
      }
      
      setInterval(updateGradient,10);
      