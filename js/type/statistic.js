function getAllStatistic() {
    axios.get('http://localhost:8080/types/statistic').then(res =>{
        let types = res.data;
        let html = `<table border="1">
                             <tr>
                                 <td>Name</td>
                                 <td>Quantity</td>
                             </tr>`;
        for (let i = 0; i < types.length; i++) {
            html += `<tr>
                                <td>${types[i].name}</td>
                                <td>${types[i].quantity}</td>
                             </tr>`
        }
        html += `</table>`;
        document.getElementById("main").innerHTML = html;
    })
}