{
    let view = {
        el: '#headColorInput',
        template: `
            <form>
                <label>
                Right Color
                <input name="color" placeholder="colorCode" type='color'>
                </label>

                <input type="submit" value="Change">
            </form>
        `,

        init() {
            this.$el = document.querySelector(this.el);
        },

        render() {
            this.$el.innerHTML = this.template;
            this.$form = this.$el.querySelector('form')
        }
    };

    let model = {
        data: {

        }
    };

    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.init();
            this.view.render();
            this.bindEvent();
            this.bindEventHub();
        },

        bindEvent() {
            this.view.$el.addEventListener('submit', (e) => {
                e.preventDefault();
                let colorValues = {};
                if (e.target && e.target.nodeName.toUpperCase() == "FORM") {
                    colorValues.color = this.view.$form.color.value;
                }
                // eventHub.emit('color-inputed', colorValues);
                console.log(colorValues)
                document.querySelector('.top').style.background = `linear-gradient(180deg, ${colorValues.color} 0%, rgba(255,255,255,1) 50%, ${colorValues.color} 100%)`;
                this.view.$el.classList.remove('active')
            })

            this.view.$el.addEventListener('click', (e) => {
                if (e.target && e.target.classList[0] === "close") {
                    this.view.$el.classList.remove('active')
                }
            })
        },

        bindEventHub() {
            eventHub.on('open-head-color-input', () => {
                this.view.$el.classList.add('active')
            })
        }
    };

    controller.init(view, model)
}