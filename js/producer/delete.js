function remove(id) {
    let choice = confirm("Bạn chắc chưa ???");
    if (choice){
        axios.delete('http://localhost:8080/producers/'+id).then(res => {
            alert("Xóa thành công");
            getAll();
        })
    }else {
        alert("Mày đùa tao à");
    }
}