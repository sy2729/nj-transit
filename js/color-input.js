{
    let view = {
        el: '#colorInput',
        template: `
            <form>
                <label>
                Left Color
                <input name="left" placeholder="colorCode">
                </label>
                <label>
                Middle Color
                <input name="middle" placeholder="colorCode">
                </label>
                <label>
                Right Color
                <input name="right" placeholder="colorCode">
                </label>

                <input type="submit" value="Change">
            </form>
        `,

        init(){
            this.$el = document.querySelector(this.el);
        },

        render(){
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

        bindEvent(){
            this.view.$el.addEventListener('submit', (e)=>{
                e.preventDefault();
                let colorValues = {};
                if (e.target && e.target.nodeName.toUpperCase() == "FORM") {
                    colorValues.left = this.view.$form.left.value;
                    colorValues.middle = this.view.$form.middle.value;
                    colorValues.right = this.view.$form.right.value;
                }
                eventHub.emit('color-inputed', colorValues);
            })
        },

        bindEventHub(){
            eventHub.on('open-color-input', ()=>{
                this.view.$form.classList.add('active')
            })
        }
    };

    controller.init(view, model)
}