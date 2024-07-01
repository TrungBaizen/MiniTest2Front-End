function getAllStatistic() {
    axios.get('http://localhost:8080/producers/statistic').then(res =>{
        let producers = res.data;
        let html = `<table border="1">
                             <tr>
                                 <td>Name</td>
                                 <td>Quantity</td>
                             </tr>`;
        for (let i = 0; i < producers.length; i++) {
            html += `<tr>
                                <td>${producers[i].name}</td>
                                <td>${producers[i].quantity}</td>
                             </tr>`
        }
        html += `</table>`;
        document.getElementById("main").innerHTML = html;
    })
}