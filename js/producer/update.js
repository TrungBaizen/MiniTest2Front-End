function showFromUpdate(id) {
    axios.get('http://localhost:8080/producers/'+id).then(res =>{
        let producer = res.data;
        let html = `
    <div>
        <input type="text" id="name" value="${producer.name}">
        <button onclick="update(${producer.id})">Sửa</button>
    </div>`
        document.getElementById("main").innerHTML = html;
    })
}
function update(id) {
    let name = document.getElementById("name").value;
    let producer = {
        name : name
    }
    axios.put('http://localhost:8080/producers/'+id,producer).then(res =>{
        alert("Sửa thành công");
        getAll();
    }).catch(error =>{
        checkInput(error.response.data)
    })
}