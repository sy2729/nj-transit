{
    let view = {
        el: '#timer',
        render(data) {
            let {time} = data || ''
            if(time) {
                document.querySelector(`${this.el} > .time`).textContent = time.hour + ':' + time.minute + ':' + time.second + ' ' + time.period;
                document.querySelector(`${this.el} > .date`).textContent = time.weekday + ', ' + time.month + ' ' + time.day + ', ' + time.year;

            }
        }
    };

    let model = {
        data: {}
    };

    let controller = {
        init(view, model) {
            this.view = view;
            this.model = model;
            this.view.render()
            this.bindEvent()
        },

        bindEvent(){
            let time;
            setInterval(()=>{
                 time = this.getTime();
                 this.model.data.time = time;
                 this.view.render(this.model.data);
            }, 1000)

        },
        
        getTime() {
            let time = new Date();
            let timeSet = {
                year: time.getFullYear(),
                month: this.getMonthName(time.getMonth()),
                day: time.getDate(),
                hour: this.convertSmallTime(time.getHours()),
                minute: this.convertSmallTime(time.getMinutes()),
                second: this.convertSmallTime(time.getSeconds()),
                weekday: this.getWeekDay(time.getDay()),
                period: time.getHours()<12?'AM':'PM',
            };
            return timeSet
        },

        getWeekDay(e){
            return isNaN(e) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][e];
        },

        convertSmallTime(time){
            let newTime = time<10?'0'+time:time;
            return newTime;
        },

        getMonthName(e) {
            return isNaN(e) ? null : ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][e];
        }
        

    };

    controller.init(view, model)
}