import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { differenceInDays } from "date-fns"

async function loadTours() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const tours = await response.json()

    /*console.log(tours)*/

    const container = document.getElementById("container")
    container.innerHTML = ""

    tours.forEach((tour) => {
        const durationDays = differenceInDays(
            new Date(tour.endTime),
            new Date(tour.startTime)
        )
        const durationNights = Math.round(durationDays - 1)

        if (tour.city === null) {
            container.innerHTML += `
            <div class="bg-white rounded-xl shadow-md shadow-white relative h-full" id="tour">
                <div class="text-xl bg-yellow-500 px-6 py-3 rounded-bl-xl rounded-tr-xl absolute top-0 right-0 z-10">
                    <p class=" font-bold text-xl">${tour.rating}</p>
                </div>
                <img src="${
                    tour.image
                }" class="h-[300px] md:h-[260px] lg:h-[230px] w-full rounded-t-xl p-1 bg-contain"/>

                <div class="flex flex-wrap flex-col justify-between px-4 pb-3 h-[200px] md:h-[235px] lg:h-[265px]">
                    <div class="font-bold text-xl text-gray-600 uppercase lg:h-1/4 lg:mb-7" >${
                        tour.hotelName
                    }</div>
                    <div class="font-bold text-gray-400 mb-2">${
                        tour.country
                    }</div>
                    <div class="font-['Manrope']">${format(
                        new Date(tour.startTime),
                        "dd MMMM yyyy",
                        { locale: ru }
                    )} - ${format(new Date(tour.endTime), "dd MMMM yyyy", {
                locale: ru,
            })}</div>
                    <div class="font-['Manrope']">${durationDays} дней / ${durationNights} ночей</div>

                    <div class="flex justify-between items-center w-full">
                        <p class="font-bold text-xl text-cyan-600">${
                            tour.price
                        } ₽</p>
                        <button id="bookTour-${
                            tour.id
                        }" class="btn-primary">Забронировать</button>
                    </div>
                </div>
            </div>
        `
        } else {
            container.innerHTML += `
            <div class="bg-white rounded-xl shadow-md shadow-white relative h-full" id="tour">
                <div class="text-xl bg-yellow-500 px-6 py-3 rounded-bl-xl rounded-tr-xl absolute top-0 right-0 z-10">
                    <p class=" font-bold text-xl">${tour.rating}</p>
                </div>
                <img src="${
                    tour.image
                }" class="h-[300px] md:h-[260px] lg:h-[230px] w-full rounded-t-xl p-1 bg-contain"/>

                <div class="flex flex-wrap flex-col justify-between px-4 pb-3 h-[200px] md:h-[235px] lg:h-[265px]">
                    <div class="font-bold text-xl text-gray-600 uppercase lg:h-1/4 lg:mb-7" >${
                        tour.hotelName
                    }</div>
                    <div class="font-bold text-gray-400 mb-2">${
                        tour.country
                    }, ${tour.city}</div>
                    <div class="font-['Manrope']">${format(
                        new Date(tour.startTime),
                        "dd MMMM yyyy",
                        { locale: ru }
                    )} - ${format(new Date(tour.endTime), "dd MMMM yyyy", {
                locale: ru,
            })}</div>
                    <div class="font-['Manrope']">${durationDays} дней / ${durationNights} ночей</div>

                    <div class="flex justify-between items-center w-full">
                        <p class="font-bold text-xl text-cyan-600">${
                            tour.price
                        } ₽</p>
                        <button id="bookTour-${
                            tour.id
                        }" class="btn-primary">Забронировать</button>
                    </div>
                </div>
            </div>
        `
        }
    })

    tours.forEach((tour) => {
        document
            .getElementById(`bookTour-${tour.id}`)
            .addEventListener("click", () => {
                bookTour(tour.id)
            })
    })

    /*открываем модальное окно*/
    let currentId
    function bookTour(id) {
        currentId = id
        document.getElementById("openModal").style.display = "flex"

        let tour = tours.find((u) => {
            return u.id === id
        })

        getValue(tour)
    }

    /*получаем данные из карточки тура*/
    function getValue(tour) {
        const startDateFmtd = format(new Date(tour.startTime), "dd MMMM yyyy", {
            locale: ru,
        })
        const endDateFmtd = format(new Date(tour.endTime), "dd MMMM yyyy", {
            locale: ru,
        })

        document.getElementById("country").value = tour.country
        document.getElementById("city").value = tour.city
        document.getElementById("hotelName").value = tour.hotelName
        document.getElementById("startTime").value = startDateFmtd
        document.getElementById("endTime").value = endDateFmtd
    }

    /*очищаем форму и закрываем модальное окно*/
    function clearForm() {
        document.getElementById("customerName").value = ""
        document.getElementById("phone").value = ""
        document.getElementById("email").value = ""
        document.getElementById("description").value = ""
    }

    function closeModal() {
        document.getElementById("openModal").style.display = "none"
        clearForm()
    }

    const closeModalBtn = document.getElementById("closeModal")
    closeModalBtn.addEventListener("click", closeModal)

    
}

loadTours()




const params = {
    customerName: document.getElementById("customerName").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,  
    description: document.getElementById("description").value                    
}
console.log(params)

/*const url = "https://www.bit-by-bit.ru/api/student-projects/tours/[id]"
let response = await fetch(url, {
  method: "POST",
  body: JSON.stringify(params)
})
let data = await response.json()*/
