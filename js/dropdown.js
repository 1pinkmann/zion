class Dropdown {
    constructor() {
        this.wrapper = document.querySelector('[data-wrapper]');
        this.background = document.getElementById('dropdown-background');
        wrapper.addEventListener('click', this.handleWrapperClick);
        
    }

    handleWrapperClick = (e) => {
        e.preventDefault;
        let link = e.target.closest('[data-link]');

        if (link) {
            let item = e.target.closest('[data-item]');
            let dropdown = item.querySelector(' [data-item] > [data-dropdown]');
            dropdown.classList.add('opened');
            this.background.classList.add('opened');
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = '17px';
        }

        let list = e.target.closest('[data-submenu-list]');
        let item = e.target.closest('[data-submenu-item]');

        if (item) {
            let submenu = item.querySelector('[data-submenu-item] > [data-submenu]');
            let items = list.querySelectorAll('.dropdown__list > .dropdown__item');
            items.forEach(item => {
                item.classList.remove('opened');
            });
            item.classList.add('opened');
        }

        let close = e.target.closest('[data-close]');
        if (close) {
            let wrapper = close.closest('[data-dropdown]');
            this.background.classList.remove('opened');
            wrapper.classList.remove('opened');
            document.body.style.overflow = 'auto';
            document.body.style.marginRight = '0';
        }   
    } 
}