function getAll() {
    axios.get('http://localhost:8080/producers').then(res => {
        let producers = res.data;
        let html = `<table border="1">
                             <tr>
                                 <td>Id</td>
                                 <td>Name</td>
                                 <td colspan="2">Action</td>
                             </tr>`;
        for (let i = 0; i < producers.length; i++) {
            html += `<tr>
                                <td>${producers[i].id}</td>
                                <td>${producers[i].name}</td>
                                <td><button onclick="showFromUpdate(${producers[i].id})">Edit</button></td>
                                <td><button onclick="remove(${producers[i].id})">Delete</button></td>
                             </tr>`
        }
        html += `</table>`;
        document.getElementById("main").innerHTML = html;
    })
}
getAll();
function goToHome(){
    window.location.assign("index.html");
}