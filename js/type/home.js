function getAll() {
    axios.get('http://localhost:8080/types').then(res => {
        let types = res.data;
        let html = `<table border="1">
                             <tr>
                                 <td>Id</td>
                                 <td>Name</td>
                                 <td colspan="2">Action</td>
                             </tr>`;
        for (let i = 0; i < types.length; i++) {
            html += `<tr>
                                <td>${types[i].id}</td>
                                <td>${types[i].name}</td>
                                <td><button onclick="showFromUpdate(${types[i].id})">Edit</button></td>
                                <td><button onclick="remove(${types[i].id})">Delete</button></td>
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