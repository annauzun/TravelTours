import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { differenceInDays } from "date-fns"

async function loadTours() {
    const response = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const tours = await response.json()

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
            <div class="bg-white rounded-xl shadow-md shadow-white relative h-full">
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
                        <p class="font-bold text-xl text-cyan-600">от ${
                            tour.price
                        } ₽</p>
                        <button class="btn-primary">Забронировать</button>
                    </div>
                </div>
            </div>
        `
        } else {
            container.innerHTML += `
            <div class="bg-white rounded-xl shadow-md shadow-white relative h-full">
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
                        <p class="font-bold text-xl text-cyan-600">от ${
                            tour.price
                        } ₽</p>
                        <button class="btn-primary">Забронировать</button>
                    </div>
                </div>
            </div>
        `
        }
    })
}
loadTours()