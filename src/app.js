
async function loadTours() {

    const response = await fetch("https://www.bit-by-bit.ru/api/student-projects/tours")
    const tours = await response.json()

    const container = document.getElementById('container')
    container.innerHTML = ""

    

    tours.forEach((tour) => {

        
        container.innerHTML += `
            <div class="bg-white rounded-lg overflow-hidden">
            <p>${tour.hotelName}</p>
                <p>${tour.country}, ${tour.city}</p>
                <img src="${tour.image}"/>
                <p>${tour.price} ₽</p>
                <p>${tour.startTime}</p>
                <p>${tour.endTime}</p>
                <p>${tour.rating}</p>
            </div>
        `
    });

    
}
loadTours()
