function showFromCreate() {
    axios.get('http://localhost:8080/producers').then(res => {
        axios.get('http://localhost:8080/types').then(response => {
            let html = `
    <div>
        <input type="text" id="name" placeholder="Name">
        <span id="errorname"></span>
        <input type="text" id="frameCode" placeholder="Frame Code">
        <span id="errorframeCode"></span>
        <input type="text" id="machineCode" placeholder="Machine Code">
        <span id="errormachineCode"></span>
        <input type="date" id="productionDate" placeholder="Production Date" min="1990-01-28" max="${new Date().toISOString().split('T')[0]}">
        <span id="errorproductionDate"></span>
        <input type="text" id="price" placeholder="Price">
        <span id="errorprice"></span>
        <input type="number" id="quantity" placeholder="Quantity">
        <span id="errorquantity"></span>
        <input type="file" id="fileButton" onchange="uploadImage(event)">
        <input type="hidden" id="image" value="">
        <div id="imgDiv"></div>
        <select id="producer">
            <option value="">---Lựa chọn---</option>`
            let producers = res.data;
            producers.map(item => {
                html += `<option value="${item.id}">${item.name}</option>`;
            })
            html += `</select>
        <span id="errorproducer"></span>
        <select id="type">
            <option value="">---Lựa chọn---</option>`
            let types = response.data;
            types.map(item => {
                html += `<option value="${item.id}">${item.name}</option>`;
            })
            html += `</select>
                <span id="errortype"></span>
                <button onclick="create()">Add</button>
    </div>`
            document.getElementById("main").innerHTML = html;
        })
    })
}

function create() {
    let name = document.getElementById("name").value;
    let frameCode = document.getElementById("frameCode").value;
    let machineCode = document.getElementById("machineCode").value;
    let productionDate = document.getElementById("productionDate").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let image = document.getElementById("image").value;
    let producer_id = document.getElementById("producer").value;
    let type_id = document.getElementById("type").value;
    let car = {
        name: name,
        frameCode: frameCode,
        machineCode: machineCode,
        productionDate: productionDate,
        price: price,
        quantity: quantity,
        image: image,
        producer: {
            id: producer_id
        },
        type: {
            id: type_id
        }
    }
    axios.post('http://localhost:8080/cars', car).then(res => {
        alert("Thêm thành công");
        getAll();
    }).catch(error => {
        checkInput(error.response.data)
    })

}

function checkInput(errors) {
    errors.map(item => {
        let err = item.split(':')
        document.getElementById('error'+err[0]).innerHTML = err[1]
    })
}

function uploadImage(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="">`
            document.getElementById('image').value = downloadURL;
        });
}