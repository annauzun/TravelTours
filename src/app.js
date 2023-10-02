import { format } from "date-fns"
import { id, ru } from "date-fns/locale"
import { differenceInDays } from "date-fns"

let allTours

async function loadTours() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const tours = await response.json()
    allTours = tours
    return tours
}

/*allTours.filter(t => t.country === "Мальдивы")*/

function render(tours) {
    const container = document.getElementById("container")

    container.innerHTML = ""

    tours.forEach((tour) => {
        const durationDays = differenceInDays(
            new Date(tour.endTime),
            new Date(tour.startTime)
        )
        const durationNights = Math.round(durationDays - 1)
        let destination = tour.country

        if (tour.city) {
            destination = `${tour.country}, ${tour.city}`
        }

        container.innerHTML += `
            <div class="bg-white rounded-xl shadow-md shadow-white relative h-full" id="tour">
                <div class="text-xl bg-yellow-500 px-6 py-3 rounded-bl-xl rounded-tr-xl absolute top-0 right-0 z-10">
                    <p class=" font-bold text-xl">${tour.rating}</p>
                </div>
                
                <img src="${
                    tour.image
                }" class="h-[300px] md:h-[260px] lg:h-[230px] w-full rounded-t-xl p-1 bg-contain"/>
                <div id="favorite-${tour.id}" class="absolute top-5 left-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-white hidden hide">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white show">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>

                </div>
                <div class="flex flex-wrap flex-col justify-between px-4 pb-3 h-[200px] md:h-[235px] lg:h-[265px]">
                    <div class="font-bold text-xl text-gray-600 uppercase lg:h-1/4 lg:mb-7" >${
                        tour.hotelName
                    }</div>
                    <div class="font-bold text-gray-400 mb-2">${destination}</div>
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
    })

    tours.forEach((tour) => {
        document
            .getElementById(`bookTour-${tour.id}`)
            .addEventListener("click", () => {
                bookTour(tour.id)
            })
    })

    tours.forEach((tour) => {
        document
            .getElementById(`favorite-${tour.id}`)
            .addEventListener("click", () => {
                favTour(tour.id)
            })
    })
}

/*открываем модальное окно*/
let currentId

function favTour(id) {
    currentId = id
    console.log(currentId)
    let tour = allTours.find((u) => {
        return u.id === id
    })

    document.querySelector(".show").classList.toggle("hidden")
    document.querySelector(".hide").classList.toggle("hidden")
}

function bookTour(id) {
    currentId = id
    document.getElementById("openModal").style.display = "flex"

    let tour = allTours.find((u) => {
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

async function init() {
    const tours = await loadTours()
    render(tours)
}

init()

const sendRequestBtn = document.getElementById("sendRequest")
sendRequestBtn.addEventListener("click", func)

async function func() {
    const customerCountryValue = document.getElementById("country").value
    const customerNameValue = document.getElementById("customerName").value
    const phoneValue = document.getElementById("phone").value
    const emailValue = document.getElementById("email").value
    const descriptionValue = document.getElementById("description").value

    const params = {
        customerCountry: customerCountryValue,
        customerName: customerNameValue,
        phone: phoneValue,
        email: emailValue,
        description: descriptionValue,
    }
    console.log(params)

    if (
        params.customerName === "" ||
        params.phone === "" ||
        params.email === "" ||
        params.description === ""
    ) {
        document.getElementById("request-error").style.display = "flex"
    } else {
        document.getElementById("request-error").style.display = "none"
    }

    console.log(currentId)
    const url = `https://www.bit-by-bit.ru/api/student-projects/tours/${currentId}`
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(params),
    })

    if (response.ok) {
        alert("Успешно")
        closeModal()
        let result = await response.json()
        return result
    } else {
        alert("Ошибка")
        closeModal()
    }
}
