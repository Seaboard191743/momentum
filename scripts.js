

const getDate = () => {
    const hoursField = document.querySelector(".hours");
    const minutesField = document.querySelector(".minutes");
    const secondsField = document.querySelector(".seconds");
    const todayDataField = document.querySelector(".todayData")

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const date = new Date()
   
    const hours = date.getHours() === 24 ? `0${date.getHours()-23}` :
                  date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    

    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    const day = date.getDay();
    const numData = date.getDate()
    const month = date.getMonth()
    todayDataField.innerText = `${numData} ${monthArr[month]}., ${days[day]}`

    hoursField.innerText = hours;
    minutesField.innerText = minutes;
    secondsField.innerText = seconds;

    setTimeout(getDate, 1000);

    return hours;
}
getDate()

const bgMap = new Map([
    [1, ["assets/morning/1.jpg", "assets/morning/2.jpg", "assets/morning/3.jpg", 
         "assets/morning/4.jpg", "assets/morning/5.jpg", "assets/morning/6.jpg",
         "assets/morning/7.jpg", "assets/morning/8.jpg", "assets/morning/9.jpg",
         "assets/morning/10.jpg"]],
    [2, ["assets/day/1.jpg", "assets/day/2.jpg", "assets/day/3.jpg", "assets/day/4.jpg",
         "assets/day/5.jpg", "assets/day/6.jpg", "assets/day/7.jpg",
         "assets/day/8.jpg", "assets/day/9.jpg", "assets/day/10.jpg"]],
    [3, ["assets/evening/1.jpg", "assets/evening/2.jpg", "assets/evening/3.jpg", "assets/evening/4.jpg",
         "assets/evening/5.jpg", "assets/evening/6.jpg", "assets/evening/7.jpg", "assets/evening/8.jpg",
         "assets/evening/9.jpg", "assets/evening/10.jpg"]],
    [4, ["assets/night/1.jpg", "assets/night/2.jpg", "assets/night/3.jpg", "assets/night/4.jpg", "assets/night/5.jpg",
         "assets/night/6.jpg", "assets/night/7.jpg", "assets/night/8.jpg", "assets/night/9.jpg",
         "assets/night/10.jpg"]]
])

const setBackground = () => {
    let hours = getDate();
    const collection = document.querySelector(".collection");
    let bg;
    const greeting = document.querySelector(".greeting");
    if(hours >= 6 && hours < 12) {
        bg = bgMap.get(1);
        greeting.innerText = "Good Morning";
        collection.style.background = "rgba(255, 255, 255, .9)";
    }
    if(hours >= 12 && hours <= 17) {
        bg = bgMap.get(2);
        greeting.innerText = "Have a nice day";
        collection.style.background = "rgba(255, 255, 255, .9)";
    }
    if(hours > 17 && hours < 24) {
        bg = bgMap.get(3);
        greeting.innerText = "Good Evening";
        collection.style.background = "rgba(35, 28, 39, 1)";
    }
    if(parseInt(hours) >= 0 && parseInt(hours) < 6) {
        bg = bgMap.get(4);
        greeting.innerText = "Good Night";
        collection.style.background = "rgba(35, 28, 39, 1)";
    }
    return bg
}


const showSlides = (shuffledArray, i = 0) => {
    const slide = document.querySelector(".slide-image");
    slide.src = shuffledArray[i]
}


const slideSlides = (shuffledArray) => {
    const slide = document.querySelector(".slide-image");
    const bgContainer = document.querySelector(".bgContainer")
    let arrayFromBgMap = [];
    for(const [key, val] of bgMap) {
        arrayFromBgMap.push(val)
    }
    const filteredBgs = [...new Set(shuffledArray.concat(arrayFromBgMap.flat()))]
    let count = 0
    document.body.addEventListener('click', e => {
        if(e.target.matches(".next")) {
            count+=1;
            if(count > filteredBgs.length-1) {
                count = 0;
            }
            showSlides(filteredBgs, count) 
        }
        if(e.target.matches(".prev")) {
            count-=1
            if(count < 0) {
                count = filteredBgs.length-1
            }
            showSlides(filteredBgs, count)
        }
        if(e.target.closest(".changeBg")) {
            bgContainer.style.background = `url(${filteredBgs[count]})`
        }
    })
}


const listBgCollection = () => {
    const collection = document.querySelector(".collection");
    const collectionBtn = document.querySelector(".collection-btn");
    const content = document.querySelector(".content");
    const clocksContainer = document.querySelector(".clocks-container");
   
    document.body.addEventListener('click', (e) => {
        if(e.target.matches(".collection-btn") || e.target.matches(".collection-btn--s")) {
            if(collection.classList.contains("collection--active")) {
                collection.className = "collection";
                collection.style.width = "100%";
                content.className = "content";
                setTimeout(() => {
                    collectionBtn.innerText = "collection";
                    clocksContainer.className = "clocks-container";
                }, 500)
            }else {
                collection.classList.add("collection--active");
                content.classList.add("content--active");
                clocksContainer.classList.add("clocks-container--active");
                setTimeout(() => {
                    if(document.documentElement.clientWidth > 1360) {
                        collection.style.width = "53%";
                    }
                    collectionBtn.innerText = "close";
                }, 700)
            }
        }
        
    })
}
listBgCollection()

const getBg = () => {
    const bg = setBackground();
    const shuffledArray = [...bg];
    for(let i = shuffledArray.length-1; i >= 0; i -= 1) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[j], shuffledArray[i]] = [shuffledArray[i], shuffledArray[j]]
    }
    let counter = 0
    const bgContainer = document.querySelector(".bgContainer")
    bgContainer.style.backgroundSize = "cover";
    bgContainer.style.background =  `url(${shuffledArray[counter]})`
    setTimeout(function changeBg() {
        bgContainer.style.background = `url(${shuffledArray[counter]})`;
        if(counter < bg.length-1) {
            setTimeout(changeBg, 60000)
        } else {
            counter = -1
            setTimeout(changeBg, 60000)
        }
        counter+=1
    })
    bgContainer.style.opacity = "1";
    showSlides(shuffledArray);
    slideSlides(shuffledArray)
}
getBg()

const getStorageName = () => {
    const nameField = document.querySelector(".nameField");
    if(!localStorage.getItem("userName")) {
        nameField.innerHTML = `<input class = "name" type="text" placeholder="Enter name"> `
    }else {
        nameField.innerText =  `${localStorage.getItem("userName")}!`
    }
}
getStorageName()

const getStorageGoal = () => {
    const goalField = document.querySelector(".goalField");
    if(!localStorage.getItem("userGoal")) {
        goalField.innerHTML = `<input class = "goal" type="text" placeholder="Type a goal"> `
    }else {
        goalField.innerText = `${localStorage.getItem("userGoal")}.`
    }

}
getStorageGoal() 


const getWeatherData = (temp, humidity, wind, icon) => {
    const weatherCond = document.querySelector(".weather-conditions")
    const tempCelsius = Math.round(temp - 273.15)
    if(localStorage.getItem("city")) {
        weatherCond.innerHTML = `
        <div class = "weatherData">t: ${tempCelsius} C&deg;, h: ${humidity}%, w: ${wind}m/s</div>
        <div class = "weather-icon">
            <img src = "http://openweathermap.org/img/wn/${icon}.png" alt = "weather icon">
        </div>
        `
    }
}
const getPhraseData = (phrases) => {
    const randomNum = Math.floor(Math.random() * (phrases.length-1 + 1))
    const changeQuoteBtn = document.querySelector(".changeQuote");
    const authorBlock = document.querySelector(".authorBlock")
    const phrasePar = document.querySelector(".phrase")
    if(!phrases[randomNum].author) {
        authorBlock.innerText = `Unknown author`
    }else {
        authorBlock.innerHTML = `<a class = "author" href = "https://en.wikipedia.org/wiki/${phrases[randomNum].author}">${phrases[randomNum].author}</a>`
    }
    phrasePar.innerText = `${phrases[randomNum].text}`
}

const changeQuoteByClick = (phrases) => {
    const changeQuoteBtn = document.querySelector(".changeQuote")
    changeQuoteBtn.addEventListener('click', () => {
        getPhraseData(phrases)
    })
}


const getStorageCity = () => {
    const cityData = document.querySelector(".cityData")
    if(!localStorage.getItem("city")) {
        cityData.innerHTML = `<input type="text" class = "city" placeholder = "Your city">`
    }else {
        cityData.innerText = `${localStorage.getItem("city")}`
    }
}
getStorageCity()


const setStorageData = (e) => {
    if(e.target.matches(".name")) {
        if(e.keyCode === 13) {
            if(e.target.value) {
                 localStorage.setItem("userName", e.target.value);
            }
            getStorageName();
        }
    }
    if(e.target.matches(".goal")) {
        if(e.keyCode === 13) {
            if(e.target.value) {
                localStorage.setItem("userGoal", e.target.value);
            } 
            getStorageGoal();
        }
    }
    if(e.target.matches(".city")) {
        if(e.keyCode === 13) {
            if(e.target.value) {
                localStorage.setItem("city", e.target.value);
            }  
            getStorageCity()
            getApiData()
        }
    }
}

const setInputAbility = (e) => {
    if(localStorage.getItem("userName")) {
        if(e.target.matches(".nameField")) {
            e.target.innerHTML = `<input class = "name" type="text" placeholder="Enter name">`
        }
    }
    if(localStorage.getItem("userGoal")) {
        if(e.target.matches(".goalField")) {
            e.target.innerHTML = `<input class = "goal" type="text" placeholder="Type a goal">`
        }
    }
    if(localStorage.getItem("city")) {
        if(e.target.matches(".cityData")) {
            e.target.innerHTML =  `<input type="text" class = "city" placeholder = "Your city">`
        }
    }
}

const getApiData = async() => {
    const cityData = document.querySelector(".cityData")
    const city = cityData.textContent || "Minsk"
    const [phrasePromise, weatherPromise] = await Promise.all([
        fetch("https://type.fit/api/quotes"),
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db604d6564e78996a42595245e269fb8`)
    ])
    if(!weatherPromise.ok) {
        alert("Something is going wrong with the Weather API")
    }else {
        const weather = await weatherPromise.json();
        getWeatherData(weather.main.temp, weather.main.humidity, weather.wind.speed, weather["weather"][0].icon)
    }
    if(!phrasePromise.ok) {
        alert("Something is going wrong with the Phrases API")
    }else {
        const phrases = await phrasePromise.json()
        getPhraseData(phrases)
        changeQuoteByClick(phrases)
    } 
}
getApiData()

document.body.addEventListener('keypress', e => {
    setStorageData(e)
})
document.body.addEventListener('click', e => {
    setInputAbility(e);
})




