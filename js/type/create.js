function showFromCreate() {
    axios.get('http://localhost:8080/types').then(res =>{
        let html = `
    <div>
        <input type="text" id="name" placeholder="Name">
        <span id="errorname"></span>
        <button onclick="create()">Add</button>
    </div>`
        document.getElementById("main").innerHTML = html;
    })
}
function create() {
    let name = document.getElementById("name").value;
    let type = {
        name : name
    }
    axios.post('http://localhost:8080/types',type).then(res =>{
        alert("Thêm thành công");
        getAll();
    }).catch(error =>{
        checkInput(error.response.data);
    })
}

function checkInput(errors) {
    errors.map(item => {
        let err = item.split(':')
        document.getElementById('error'+err[0]).innerHTML = err[1]
    })
}