Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}
const noop = () => {}
function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')
    buttons.forEach(button => {
        const $button = document.createElement('button')
        $button.textContent = button.text
        // $button.classList.add('btn')
        $button.classList.add('btn',`btn-${button.type || 'secondary'}`)
        $button.onclick = button.handler || noop
        wrap.appendChild($button)
    })
    return wrap
}

function _createCards(cards) {
    const $modal = _createModal(options1)

    const cardsNodes = []
    cards.forEach(card => {
        const crd = document.createElement('div')
        crd.classList.add('col')
        crd.insertAdjacentHTML('afterbegin',
            `<div class="card" id="${card.id}">
                <img  style="height: 350px; width: 380px;" src=${card.img} class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <a href="#" class="btn btn-primary">${card.price}</a>
                    <a href="#" class="btn btn-danger">Delete</a>
                </div>
            </div>`)
        cardsNodes.push(crd)
        // document.querySelector('.row').appendChild(crd)
    })
    return cardsNodes
}

$.cards = function(cards) {
    const $cards = _createCards(cards)
    return {
        createCards() {
            $cards.forEach(card => {
                document.querySelector('.row').appendChild(card)
            })
        }
    }
}






function _createModal({ title, content, width , closable, footerButtons}) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin',
    `<div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${title || 'Window'}</span>
                    ${closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${content || ''}
                </div>
<!--                <div class="modal-footer">-->
<!--                    <button>Ok</button>-->
<!--                    <button>Cancel</button>-->
<!--                </div>-->
        </div>
    </div>`)
    const footer = _createModalFooter(footerButtons)
    footer.appendAfter(modal.querySelector('.modal-body'))
    document.body.appendChild(modal)
    return modal
}

$.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                console.log('Modal is destroyed')
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
            }, ANIMATION_SPEED)
        }
    }
    const listener = event => {
        if (event.target.dataset.close)
            modal.close()
    }

    $modal.addEventListener('click',listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            // $modal.querySelector('[data-content]').innerHTML = html
            $modal.querySelector('.modal-body').innerHTML = html
        }
    })
}

