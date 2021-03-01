import React from "react";
import Validator from 'validate-framework-utils';
class Validate extends React.Component{
    constructor(props){
        super(props);
        this.validator = new Validator();
        console.log("validator" , this.validator);
    }
    render(){
        const field = {
            rules: 'required | isEmail | maxLength(32)', // Asynchronous methods need to be put to the end
            messages: 'Can not be empty! | Please enter a valid email address. | Can not exceed {{param}} characters.',
        };
        // const {
        //     result, // The verification result 
        //     error, // contains the error message
        // } = this.validator.isEmail(field)('example@example.com');

        return <p>validateResult: {}</p>
    }
}

export default Validate;