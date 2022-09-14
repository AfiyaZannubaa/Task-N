export const handleChange = (e, setForm) =>{
    e.preventDefault();
    setForm((prevData)=>{
        return{
            ...prevData,
            [e.target.name]: e.target.value,
        };
    })
}

export const handleChangeMultiselect = (event, setState, callback = () => {}) =>{
const {name, value, selectedOptions } = event.target;

setState((preState) => {

    return{
        ...preState,
        [name]:Array.from(selectedOptions,(option)=>option.value),
    };
});

callback();

} 
