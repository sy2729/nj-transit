import {  } from "./scss/index.scss";
import {  } from "./js/eventHub";
import {  } from "./js/timer";
import {  } from "./js/color";
import {  } from "./js/color-input";

        function CountDown(ele, duration){
            this.ele = ele;
        this.timeToCountDown = duration;
        }

        CountDown.prototype = {
            render(time){
        this.ele.textContent = 'Expires in ' + time.day + ':' + time.hours + ':' + time.minutes + ':' + time.seconds;
            },
            startCount(){
            this.render(this.timeToCountDown);
        let update = ()=>{
            setTimeout(() => {
                if (this.timeToCountDown > 0) {
                    this.timeToCountDown--;
                    let newTime = this.formate(this.timeToCountDown);
                    this.render(newTime);
                    update();
                } else { alert('expired!'); };
            }, 1000);
        };
                update();
            },

            formate(time){
            let timeSet = {
            day: '00',
                    hours: this.convertSmallTime(Math.floor(time / 60 / 60)),
                    minutes: this.convertSmallTime(Math.floor((time / 60)) % 60),
                    seconds: this.convertSmallTime(time % 60),
                }
                return timeSet;
            },
            convertSmallTime(time) {
            let newTime = time < 10 ? '0' + time : time;
                return newTime;
            },

        }

        let time = new CountDown(document.querySelector('#countDown'), 60*60*2.8);
        time.startCount();


        // listen to color-input component Open
        document.querySelector('#back').addEventListener('click', ()=>{
            eventHub.emit('open-color-input');
        })