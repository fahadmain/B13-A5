const tabs = document.querySelectorAll(".tab");
const container = document.getElementById("issue-container");

let issues = [];

// fetching data 
spinner.classList.remove("hidden");

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then((res) => res.json())
.then((data) => {
    issues = data.data
    console.log(issues);
    renderIssues("all");
    spinner.classList.add("hidden");
});


// display data 
function renderIssues(type){
    container.innerHTML = "";

    let filtered = [];

    if(type === "all"){
        filtered = issues;
    }

    if(type === "open"){
        filtered = issues.filter((i) => i.status === "open");
    }

    if(type === "closed"){
        filtered = issues.filter((i) => i.status === "closed");
    }

    filtered.forEach((issue) =>{
        let card = document.createElement("div");

        let border = issue.status === "open" ? "border-t-[#00A96E]" : "border-t-[#A855F7]";
        card.className = `border border-t-4 ${border} p-2`;
        card.innerHTML = `${issue.title}`;

        container.appendChild(card);
    })


}


document.getElementById("allTab").onclick = function () {
    setActive(this)
    renderIssues("all");
    console.log("all tab clicked");
}

document.getElementById("openTab").onclick = function () {
    setActive(this)
    renderIssues("open");
    console.log("open tab clicked");
}

document.getElementById("closedTab").onclick = function () {
    setActive(this)
    renderIssues("closed");
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