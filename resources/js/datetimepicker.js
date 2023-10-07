export const initDateTimePicker = () => {
    const el = $(".datetimepicker");
    if (el) {
        el.datetimepicker();
    } 
}

initDateTimePicker();