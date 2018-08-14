window.eventHub = {
    events: {},
    emit: function emit(eventName, data) {
        var fnList = this.events[eventName];
        fnList.map(function (fn) {
            fn.call(undefined, data);
        });
    },
    on: function on(eventName, fn) {
        if (this.events[eventName] === undefined) {
            this.events[eventName] = [];
        };
        this.events[eventName].push(fn);
    },
    off: function off() { }
};