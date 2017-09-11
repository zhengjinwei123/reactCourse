export default {
    getItem: function (key) {
        let value = null;
        try {
            value = localStorage.getItem(key);
        } catch (ex) {
            if (__DEV__ === '1') {
                console.error("localStore.getItem error", ex.message);
            }
        }
        return value;
    },
    setItem: function (key, value) {
        try {
            // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
            localStorage.setItem(key, value);
        } catch (ex) {
            if (__DEV__ === "1") {
                console.error("localStorage.setItem error", ex.message);
            }
        }
    }
}
