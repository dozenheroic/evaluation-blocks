const starConteiners = document.querySelectorAll('.stars');
starConteiners.forEach((ele) => {
    const starsUL = createElements(ele, 'ul', 'main'); //создание звезд . место в разметке
    const output = createElements(ele, 'div', 'output'); //описание оценки . место в разметке

    for (let x = 0; x < 5; x++) {
        const star = createElements(starsUL, 'li', 'star');
        star.innerHTML = '&#10032';
        star.starValue = (x + 1);
        ['mouseover', 'mouseout', 'click'].forEach((el) => {
            star.addEventListener(el, starRate);
        });
    }
});

//функция высшего порядка
function starRate(e) {
    const eventType = e.type;
    const star = e.target;
    const parent = star.closest('.stars');
    const output = parent.querySelector('.output');
    const curStars = parent.querySelectorAll('.star');

    if (eventType === 'click') {
        output.innerHTML = `Вы оценили на ${star.starValue} &#10032`;
        addColor(curStars, star.starValue);
    } else if (eventType === 'mouseover') {
        addYellow(curStars, star.starValue);
    } else if (eventType === 'mouseout') {
        addColor(curStars, output.innerHTML ? output.innerHTML.match(/\d+/)[0] : 0);
    }

    function addYellow(curStars, val) {
        curStars.forEach((point, index) => {
            if (index < val) {
                point.classList.add('yellow');
            } else {
                point.classList.remove('yellow');
            }
        });
    }
}

function addColor(curStars, val) {
    curStars.forEach((point, index) => {
        if (index < val) {
            point.classList.add('orange');
        } else {
            point.classList.remove('orange');
        }
    });
}

function createElements(place, eltype, myClass) {
    const elem = document.createElement(eltype);
    elem.classList.add(myClass);
    place.append(elem);
    return elem;
}