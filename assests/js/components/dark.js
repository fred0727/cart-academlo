function dark(){
    const ls = window.localStorage;

    const btnDark = document.querySelector('.btn--dark');
    const footer = document.querySelectorAll('.footer__title');
    const foot = document.querySelector('.footer__title');
    const productContent = document.querySelectorAll('.product__content');
    var root = document.querySelector(':root');

    const theme = ls.getItem('theme')
    if (theme === 'dark') {
        darkMode()
    }else{
        ligthMode()
    }

    btnDark.addEventListener('click', function(e){
        if (foot.classList.contains('dark--mode')) {
            ligthMode()
            e.target.closest('.bx').classList.remove('bxs-sun')
            e.target.closest('.bx').classList.add('bxs-moon')
        }else{
            darkMode()
            e.target.closest('.bx').classList.remove('bxs-moon')
            e.target.closest('.bx').classList.add('bxs-sun')
        }
    })


    function darkMode(){
        root.style.setProperty('--body-color', '#000000');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--title-color', '#ffffff');
        root.style.setProperty('--bg-color', '#000000');
        root.style.setProperty('--card-color', '#ffffff');
        footer.forEach(element => {
            element.classList.add('dark--mode')
        });
        productContent.forEach(element => {
            element.classList.add('dark--content--product')
        })
        ls.setItem("theme", "dark")
    }

    function ligthMode(){
        root.style.setProperty('--body-color', '#f7f7f8');
        root.style.setProperty('--text-color', '#333333');
        root.style.setProperty('--title-color', '#1a1a1a');
        root.style.setProperty('--bg-color', '#ffffff');
        root.style.setProperty('--card-color', '#e6e6e6');
        footer.forEach(element => {
            element.classList.remove('dark--mode')
        });
        productContent.forEach(element => {
            element.classList.remove('dark--content--product')
        })
        ls.removeItem("theme")
    }
}

export default dark