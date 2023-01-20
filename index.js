let fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://parade.com/.image/t_share/MTkwNTgxNDY1MzcxMTkxMTY0/different-types-of-apples-jpg.jpg'},
    {id: 2, title: 'Oranges', price: 30, img: 'https://www.bhg.com/thmb/8ql9jldzLGPruyLpmOWWWmR3UJQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-oranges-4d6a86c11fe14668ad798774e16697f8.jpg'},
    {id: 3, title: 'Mango', price: 40, img: 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/01/mangoes_what_to_know_1296x728_header-1024x575.jpg?w=1155&h=1528'}
]

const toHTML = fruit =>
    `<div class="col">
        <div class="card">
            <img style="height: 350px; width: 380px;" src=${fruit.img} class="card-img-top" alt="${fruit.title}">
                <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Show price</a>
                    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
                </div>
        </div>
    </div>`


// console.log(toHTML({id: 1, title: 'Apples', price: 20, img: 'https://parade.com/.image/t_share/MTkwNTgxNDY1MzcxMTkxMTY0/different-types-of-apples-jpg.jpg'}))



// const options = {
//     title: 'Title',
//     closable: true,
//     content: `<p>Lorem ipsum dolor sit amet, consectetur.</p>
//               <p>Lorem ipsum dolor sit amet, consectetur.</p>`,
//     width: '400px',
//     footerButtons: [
//         {text: 'Ok', type: 'primary', handler() {
//                 console.log('Primary btn clicked')
//                 modal.close()
//             }},
//         {text: 'Cancel', type: 'danger', handler() {
//                 console.log('Danger btn clicked')
//                 modal.close()
//             }}
//     ]
// }

const options1 = {
    title: 'Fruit price',
    closable: true,
    // content: `<p>Lorem ipsum dolor sit amet, consectetur.</p>
    //           <p>Lorem ipsum dolor sit amet, consectetur.</p>`,
    width: '400px',
    footerButtons: [
        {text: 'Close', type: 'primary', handler() {
                // console.log('Primary btn clicked')
                priceModal.close()
            }}
    ]
}

// const options2 = {
//     title: 'Are you sure?',
//     closable: true,
//     // content: `<p>Lorem ipsum dolor sit amet, consectetur.</p>
//     //           <p>Lorem ipsum dolor sit amet, consectetur.</p>`,
//     width: '400px',
//     footerButtons: [
//         {text: 'Cansel', type: 'secondary', handler() {
//                 // console.log('Primary btn clicked')
//                 confirmModal.close()
//             }},
//         {text: 'Delete', type: 'danger', handler() {
//                 // console.log('Primary btn clicked')
//                 confirmModal.close()
//             }}
//     ]
// }

const priceModal = $.modal(options1)
// const confirmModal = $.modal(options2)
// const modal = $.modal(options)
const cards = $.cards(fruits)

function render() {
    // const html = fruits.map(fruit => toHTML(fruit))
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(fruit => fruit.id === id)
    if (btnType === 'price') {
        priceModal.setContent(`<p>${fruit.title} price: <strong>${fruit.price}$</strong></p>`)
        priceModal.open()
        // console.log(id, fruit)
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Are you sure?',
            content: `<p>You remove <strong>${fruit.title}</strong></p>`
        }).then(() => {
            console.log('Delete')
            fruits = fruits.filter(fruit => fruit.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
        // confirmModal.setContent(`
        // <p>You remove <strong>${fruit.title}</strong></p>
        // `)
        // confirmModal.open()
    }
})


