class DateService 
{

    constructor(date){
        this.date = date;
    }

    getDateInstance(time){
        return new this.date(time);
    }

    getDateNow()
    {
        const now = Date.now();

        const localeNow = now.toLocaleString('es-ES', {day:'numeric', month:'long', year: 'numeric'});

        return localeNow;
    }

    getMinutes(time)
    {
        const date = this.get
    }


}

export const year = () => {
    const date = new Date();
    return date.getFullYear();
}

export default DateService;