const tabs = document.querySelectorAll(".tab");
const container = document.getElementById("issue-container");

let issues = [];

// fetching data 
fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then((res) => res.json())
.then((data) => {
    issues = data.data
    console.log(issues);
    renderIssues("all");
});


// display data 
function renderIssues(type){
    container.innerHTML = "";

    let filtered = [];

    if(type === "all"){
        filtered = issues;
    }

    filtered.forEach((issue) =>{
        let card = document.createElement("div");

        card.className = "border p-2"
        card.innerHTML = `${issue.title}`;

        container.appendChild(card);
    })


}


document.getElementById("allTab").onclick = function () {
    setActive(this)
    console.log("all tab clicked");
}

document.getElementById("openTab").onclick = function () {
    setActive(this)
    console.log("open tab clicked");
}

document.getElementById("closedTab").onclick = function () {
    setActive(this)
    console.log("closed tab clicked");
}

function setActive(tab) {
    tabs.forEach((t) => {
        t.classList.remove("bg-indigo-700", "text-white");
        t.classList.add("bg-white");

    })

    tab.classList.remove("bg-white");
    tab.classList.add("bg-indigo-700", "text-white");
}