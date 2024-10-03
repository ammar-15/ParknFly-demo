document.addEventListener('DOMContentLoaded', () => {
    const addNewCarBtn = document.getElementById('addNewCarBtn');
    const popupForm = document.getElementById('popupForm');
    const closeBtn = document.querySelector('.closeBtn');
    const carForm = document.getElementById('carForm');
    const totalAmountSpan = document.getElementById('totalAmount');
    const departureDateInput = document.getElementById('departureDate');
    const arrivalDateInput = document.getElementById('arrivalDate');
    const carList = document.getElementById('carList');

    // Load cars from local storage
    let cars = JSON.parse(localStorage.getItem('cars')) || [];

    function saveCars() {
        localStorage.setItem('cars', JSON.stringify(cars));
    }

    function renderCars() {
        carList.innerHTML = '';
        cars.forEach((car) => {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');
            carCard.innerHTML = `
                <h3>${car.firstName} ${car.lastName}</h3>
                <p>Vehicle Model: ${car.vehicleModel}</p>
                <p>Plate Number: ${car.plateNumber}</p>
                <p>Departure Date: ${car.departureDate}</p>
                <p>Arrival Date: ${car.arrivalDate}</p>
                <p>Flight Number: ${car.flightNumber}</p>
                <p>Total Amount: $${car.totalAmount.toFixed(2)}</p>
            `;
            carList.appendChild(carCard);
        });
    }

    function calculateTotalAmount() {
        const departureDate = new Date(departureDateInput.value);
        const arrivalDate = new Date(arrivalDateInput.value);
        if (departureDate && arrivalDate && arrivalDate > departureDate) {
            const diffTime = arrivalDate - departureDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const perDayAmount = 8 + (8 * 0.15); // $8 plus 15% per day
            const totalAmount = perDayAmount * diffDays;
            totalAmountSpan.textContent = totalAmount.toFixed(2);
        } else {
            totalAmountSpan.textContent = '0.00';
        }
    }

    // Event Listeners
    addNewCarBtn.addEventListener('click', () => {
        console.log("Add New Car button clicked"); // Debugging log
        popupForm.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        popupForm.style.display = 'none';
        carForm.reset();
        totalAmountSpan.textContent = '0.00';
    });

    window.addEventListener('click', (event) => {
        if (event.target == popupForm) {
            popupForm.style.display = 'none';
            carForm.reset();
            totalAmountSpan.textContent = '0.00';
        }
    });

    departureDateInput.addEventListener('change', calculateTotalAmount);
    arrivalDateInput.addEventListener('change', calculateTotalAmount);

    carForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const car = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            vehicleModel: document.getElementById('vehicleModel').value,
            plateNumber: document.getElementById('plateNumber').value,
            departureDate: document.getElementById('departureDate').value,
            arrivalDate: document.getElementById('arrivalDate').value,
            flightNumber: document.getElementById('flightNumber').value,
            totalAmount: parseFloat(totalAmountSpan.textContent),
        };
        cars.push(car);
        saveCars();
        renderCars();
        popupForm.style.display = 'none';
        carForm.reset();
        totalAmountSpan.textContent = '0.00';
    });

    // Initial render
    renderCars();
});
