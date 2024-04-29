let options = document.querySelectorAll(".optionNumber");
let newArr = Array.from(options);
let optionBtnValue;

newArr.forEach(e=>{
    e.addEventListener("click",function () {
         optionBtnValue = e.value;
        console.log(e.value);
        
    })
})


export {optionBtnValue};