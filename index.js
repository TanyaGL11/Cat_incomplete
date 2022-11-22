
const $wr = document.querySelector(`[data-wr]`)
const $openModal = document.querySelector(`[data-open_model]`)
const $modalsWr = document.querySelector(`[data-models_wr]`)

//const $showModal = document.getElementById(`[data-showModal]`)
//console.log($showModal);
//const $showInput = document.getElementById('showInput')

class API {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    //находим всех котов
    async getAllCats() {
        try {
            const response = await fetch(`${this.baseUrl}/show`)
            //const data = await response.json()

            return response.json()
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteCat(catId) {
        const response = await fetch(`${this.baseUrl}/delete/${catId}`, { method: "DELETE", })
        if (response.status !== 200) { throw new Error(error) }
        return response.json()
    } catch(error) {
        throw new Error(error)
    }
    async showCat(catId) {
        const response = await fetch(`${this.baseUrl}/show/${catId}`, { method: "GET", })
        if (response.status !== 200) { throw new Error(error) }
        return response.json()
    } catch(error) {
        throw new Error(error)
    }

    //функция всегда возвращает промис
    async addCat(data) {
        try {
            const response = await fetch(`${this.baseUrl}/add`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                //приводим к строке
                body: JSON.stringify(data),
            })
            return response.json()
        } catch (error) {
            throw new Error(error)
        }
    }
}
const api = new API(`http://sb-cats.herokuapp.com/api/2/TanyaGL11`)

//обращаемся к ключу data(вариант 2)
//api.getAllCats().then((responseFromBn) => responseFromBn.data.array.forEach(cat => $wr.insertAdjacentHTML('beforeend', generateCatHTML(cat))))

function generateCatHTML(cat) {
    return `
    <div data-card_id=${cat.id} class="card my-2">
        <div class="card-body" style="background-image: url(${cat.img_link}); no-repeat; background-size: cover;" >
            <h3 class="card-title py-2">${cat.name}</h3>
            <h5 class="card-title"> Лет пушистику - ${cat.age}</h5>
            <p class="card-text">
              ${cat.description}
            </p>
            <div id="show">
            <button data-action="show" class="btn btn-primary"> Показать </button></div>
            <button data-action="delete" class="btn btn-danger"> Удалить </button>
        </div>
    </div>
 `
}
function generateCatShowHTML(cat) {
    return `<div data-models_sr class="modal" tabindex="-1">
        <div class="popup-wrapper">
            <div class="popup">
                <div class="popup_close"></div>
                <div class="popup-content">
                    <form name="add_cat">
                        <img src="${cat.img_link}" alt="">
                        <div class="mb-3">
                            <input type="number" required name="id" id="disabledTextInput" class="form-control"
                                placeholder="id" aria-describedby="elailHelp">
                        </div>
                        <div class="mb-3">
                            <input type="text" required name="${cat.name}" id="disabledTextInput" class="form-control"
                                placeholder="Кличка питомца" aria-describedby="elailHelp">
                        </div>
                        <div class="mb-3">
                            <input type="number" name="age" id="disabledTextInput" class="form-control"
                                placeholder="Возраст питомца в годах" aria-describedby="elailHelp">
                        </div>
                        <div class="mb-3">
    
                            <input type="number" name="rate" id="exampleInputEmail1" class="form-control"
                                placeholder="Рейтинг" aria-describedby="elailHelp">
                        </div>
                        <div class="mb-3">
                            <input type="text" name="description" id="disabledTextInput" class="form-control"
                                placeholder="Информация о любимце" aria-describedby="elailHelp">
                        </div>
                        <div class="mb-3">
                            <input type="text" name="img_link" id="disabledTextInput" class="form-control"
                                placeholder="URL адрес фото" aria-describedby="elailHelp">
                        </div>
                        <div class="mb-3 form-check">
                            <input name="favorite" type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Мой любимец</label>
                        </div>
    
    
                        <button type="submit" class="btn btn-primary">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    </div>`
}

    fetch(`http://sb-cats.herokuapp.com/api/2/TanyaGL11/show`)
        .then((response) => response.json())
        .then((json) => {
            const catHTML = json.data.map(cat => generateCatHTML(cat)).join("")
            $wr.insertAdjacentHTML(`beforeend`, catHTML)
            //console.log(catHTML);
        })
        
    

    /*$wr.addEventListener('click',(event) =>{
    console.log(event.target.dataset.action)
    })*/

    document.addEventListener('click', (event) => {
        /* console.log(event.target.dataset.action)*/
        /*console.dir(event.target); -Для работы с элементом к консоле*/
        switch (event.target.dataset.action) {
            case 'delete': {
                //найдем id
                const $cardWr = event.target.closest(`[data-card_id]`)
                const cardId = $cardWr.dataset.card_id
                // console.log(cardId)
                api.deleteCat(cardId).then(() => {
                    $cardWr.remove()
                }).catch(() => { new Error(error) })
                break
            }
            case 'show':
                const $cardWrShow = event.target.closest(`[data-card_id]`)
                const $cardIdShow = $cardWrShow.dataset.card_id
                api.showCat(cardId)
               .then(() => {
                    generateCatShowHTML(cardId)
                }).catch(() => { new Error(error) })                
                break;

        }
    })
    //console.log($cardIdShow)
    fetch(`http://sb-cats.herokuapp.com/api/2/TanyaGL11/show/`)
        .then((response) => response.json())
        .then((json) => {
            const catHTML = json.data.map(cat => generateCatShowHTML(cat)).join("")
            $wr.insertAdjacentHTML(`beforeend`, catHTML)
            console.log(catHTML);
        })
    //отслеживаем отправку формы
    document.forms.add_cat.addEventListener('submit', (event) => {
        //Блокировка обработки кликов по умолчанию
        event.preventDefault()
        //получили введенные данные по новому кому
        const data = Object.fromEntries(new FormData(event.target).entries())
        //приводим значания в соотвествие типов
        data.id = +data.id
        data.rate = +data.rate
        data.favorite = data.favorite == 'on'
        api.addCat(data).then(() => {
            $wr.insertAdjacentHTML(`beforeend`, generateCatHTML(data))
            $modalsWr.classList.add('hidden')
            event.target.reset()
        }).catch(alert)
    })
    $openModal.addEventListener('click', () => {
        const newLocal = 'hidden'
        $modalsWr.classList.remove('hidden')
    })
    /*$showModal.addEventListener('click', ()=>{
        const newLocalShow = 'hidden'
        $modalsWr.classList.remove('hidden')
    })*/
    const popupBlock = document.querySelector('.popup-wrapper');
    popupBlock.querySelector('.popup_close').addEventListener("click", function () {
        popupBlock.classList.remove('active')
    })
    /*let i =document.querySelector("#show").addEventListener("click",
        function (e) {
            e.preventDefault()
            popupBlock.classList.add('active')
        })*/
        