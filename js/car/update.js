function showFromUpdate(id) {
    axios.get('http://localhost:8080/cars/' + id).then(res => {
        let car = res.data;
        let dateArr = car.productionDate;
        let dateObject = new Date(dateArr[0],dateArr[1]-1,dateArr[2]);
        let dateString = dateObject.getFullYear() + '-' + ('0' + (dateObject.getMonth() + 1)).slice(-2) + '-' + ('0' + dateObject.getDate()).slice(-2);
        axios.get('http://localhost:8080/producers').then(resp => {
            axios.get('http://localhost:8080/types').then(response => {
                let html = `
     <div>
        <input type="number" id="id" value="${car.id}" readonly>
        <input type="text" id="name" value="${car.name}">
        <span id="errorname"></span>
        <input type="text" id="frameCode" value="${car.frameCode}">
        <span id="errorframeCode"></span>
        <input type="text" id="machineCode" value="${car.machineCode}">
        <span id="errormachineCode"></span>
        <input type="date" id="productionDate" value="${dateString}" min="1990-01-28" max="${new Date().toISOString().split('T')[0]}">
        <span id="errorproductionDate"></span>
        <input type="text" id="price" value="${car.price}">
        <span id="errorprice"></span>
        <input type="number" id="quantity" value="${car.quantity}">
        <span id="errorquantity"></span>
        <input type="file" id="fileButton" onchange="uploadImage(event)">
        <input type="hidden" id="image" value="${car.image}">
        <img src="${car.image}" alt="">
        <div id="imgDiv"></div>
        <select id="producer">
            <option value="">---Lựa chọn---</option>`
                let producers = resp.data;
                producers.map(item => {
                    if (item.id === car.producer.id){
                        html += `<option value="${item.id}" selected>${item.name}</option>`;
                        return;
                    }
                    html += `<option value="${item.id}">${item.name}</option>`;
                })
                html += `</select>
        <span id="errorproducer"></span>
        <select id="type">
            <option value="">---Lựa chọn---</option>`
                let types = response.data;
                types.map(item => {
                    if (item.id === car.type.id){
                        html += `<option value="${item.id}" selected>${item.name}</option>`;
                    }
                    html += `<option value="${item.id}">${item.name}</option>`;
                })
                html += `</select>
                <span id="errortype"></span>
                <button onclick="update(${car.id})">Update</button>
    </div>`
                document.getElementById("main").innerHTML = html;
            })
        })
    })
}

function update(id) {
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
    axios.put('http://localhost:8080/cars/'+id, car).then(res => {
        console.log(1)
        alert("Sửa thành công");
        getAll()
    }).catch(error =>{
        console.log(error.response)

        checkInput(error.response.data);
    })
}