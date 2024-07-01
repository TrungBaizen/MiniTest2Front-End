function showFromUpdate(id) {
    axios.get('http://localhost:8080/types/'+id).then(res =>{
        let type = res.data;
        let html = `
    <div>
        <input type="text" id="name" value="${type.name}">
        <button onclick="update(${type.id})">Sửa</button>
    </div>`
        document.getElementById("main").innerHTML = html;
    })
}
function update(id) {
    let name = document.getElementById("name").value;
    let type = {
        name : name
    }
    axios.put('http://localhost:8080/types/'+id,type).then(res =>{
        alert("Sửa thành công");
        getAll();
    }).catch(error =>{
        checkInput(error.response.data)
    })
}