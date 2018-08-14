{
    let view = {
        el: '#colorBar',
        template: `
            <div class="color"></div>
            <div class="color"></div>
            <div class="color"></div>
        `,
        render(data){
            document.querySelector(this.el).innerHTML = this.template;
            colors = data.colors;
            let colorDoms = document.querySelectorAll('.color');
            for(let i = 0; i < colorDoms.length; i++) {
                colorDoms[i].style.backgroundColor = colors[i];
            }

        }
    };

    let model = {
        data: {
            colors: ['#385656', '#BDD2E7', '#EEDB88'],
        }
    };

    let controller = {
        init(view, model){
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            this.bindEvent();
            this.bindEventHub();
        },

        bindEvent(){

        },
        bindEventHub(){
            eventHub.on('color-inputed', (data)=>{
                let colors = [];
                for( i in data) {
                    colors.push(data[i])
                }
                
                this.changeColor(colors);
            })
        },

        changeColor(data){
            this.model.data.colors = data;
            this.view.render(this.model.data);
        }
    };

    controller.init(view, model);
}