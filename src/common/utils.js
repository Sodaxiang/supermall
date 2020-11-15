export function debounce(func, delay=0){
    let timer = null;
    return function(){
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this);
        }, delay);
    }
}