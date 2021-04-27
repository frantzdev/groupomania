<template>
    <div class="container">
        <FormNewMessage />
    </div>
</template>

<script>
import axios from "axios";
import FormNewMessage from "../components/FormNewMessage";
export default {
    name: "messagenew",
    components: {
        FormNewMessage
    },
     mounted () {
            axios.get('http://localhost:3000/api/message/new', {
            headers: {"Authorization": 'Bearer' + " " + localStorage.getItem('token')}
            })
            .then(response => {                
                console.log(response); 
            })
            .catch(error => console.log(error));          
        } 
}
</script>