function getInfo() {
    const stopId = document.querySelector('#stopId')
    const stopName = document.querySelector('#stopName')
    const buses = document.querySelector('#buses')


    function createElementWithTextContent(tag, textContent) {
        const e = document.createElement(tag)
        e.textContent = textContent
        return e
    }

    const busInformation = 'http://localhost:3030/jsonstore/bus/businfo/'
    fetch(`${busInformation}${stopId.value}`).then(x => x.json()).then(x => {
        stopName.textContent = x['name']
        for (const key in x['buses']) {
            buses.appendChild(createElementWithTextContent('li', `Bus ${key} arrives in ${x['buses'][key]} minutes`))
        }
    }).catch(() => {
        stopName.textContent = 'Error'
    })

}



//
// async function getInfo() {
//     const stopId = document.querySelector('#stopId');
//     const stopName = document.querySelector('#stopName');
//     const buses = document.querySelector('#buses');
//
//     function createElementWithTextContent(tag, textContent) {
//         const e = document.createElement(tag);
//         e.textContent = textContent;
//         return e;
//     }
//
//     try {
//         const busInformation = `http://localhost:3030/jsonstore/bus/businfo/${stopId.value}`;
//         const response = await fetch(busInformation);
//         const data = await response.json();
//
//         stopName.textContent = data.name;
//         buses.innerHTML = '';
//
//         for (const [busId, time] of Object.entries(data.buses)) {
//             buses.appendChild(createElementWithTextContent('li', `Bus ${busId} arrives in ${time} minutes`));
//         }
//     } catch (error) {
//         console.error(error);
//         stopName.textContent = 'Error';
//     }
// }



//
// async function getInfo() {
//
//     const stopId = document.querySelector('#stopId').value
//     const stopName = document.querySelector('#stopName')
//     const buses = document.querySelector('#buses')
//     const API = 'http://localhost:3030/jsonstore/bus/businfo/'
//
//     const test = {
//         "buses": {"76": 15, "84": 10, "204": 10, "213": 18, "280": 9, "306": 31, "604": 11},
//         "name": "Orlov Most sq."
//     }
//
//     // fetch(`${API}${stopId}`)
//     //     .then(x => x.json())
//     //     .then(x => {
//     //         stopName.textContent = x.name
//     //         // x['buses']
//     //         buses.innerHTML = ''
//     //         for (const bus in x.buses) {
//     //             const li = document.createElement('li')
//     //             li.textContent = `Bus ${bus} arrives in ${x.buses[bus]} minutes`
//     //             buses.appendChild(li)
//     //         }
//     //
//     //     })
//     //     .catch(() => {
//     //         stopName.textContent = 'Error'
//     //     })
//
//
//     try {
//         const response = await fetch(`${API}${stopId}`)
//         const x = await response.json()
//         stopName.textContent = x.name
//         // x['buses']
//         buses.innerHTML = ''
//         for (const bus in x.buses) {
//             const li = document.createElement('li')
//             li.textContent = `Bus ${bus} arrives in ${x.buses[bus]} minutes`
//             buses.appendChild(li)
//         }
//     } catch (err) {
//         console.log(err)
//         stopName.textContent = 'Error'
//     }
//
// }

