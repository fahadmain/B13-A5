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
function renderIssues(type) {
    container.innerHTML = "";

    let filtered = [];

    if (type === "all") {
        filtered = issues;
    }

    if (type === "open") {
        filtered = issues.filter((i) => i.status === "open");
    }

    if (type === "closed") {
        filtered = issues.filter((i) => i.status === "closed");
    }

    filtered.forEach((issue) => {
        let card = document.createElement("div");

        let statusImg = issue.status === "open"
            ? "./assets/Open-Status.png"
            : "./assets/Closed-Status.png";

        let priorityStyle = "";

        if (issue.priority === "high") {
            priorityStyle = "bg-red-100 text-red-500";
        } else if (issue.priority === "medium") {
            priorityStyle = "bg-yellow-100 text-yellow-600";
        } else {
            priorityStyle = "bg-gray-200 text-gray-500";
        }

        let border = issue.status === "open" ? "border-t-green-500" : "border-t-purple-500";
        card.className = `border-t-4 card bg-gray-100 w-80 h-96 shadow-xl rounded-xl ${border}`;
        card.innerHTML = `<div class="card-body my-8 ">
            <div class="flex justify-between">
                <p><img src="${statusImg}" alt=""></p>
                <span class="${priorityStyle} rounded-full font-semibold text-center w-20">${issue.priority}</span>
            </div>
            <h2 class="font-bold text-lg">${issue.title}</h2>
            <p class="text-gray-500 ">${issue.description}</p>

            <div class="flex gap-2">
                <span class="bg-red-100 text-red-500 font-bold w-16 text-center rounded-xl p-1 text-xs flex gap-1 items-center"><i class="fa-solid fa-bug"></i>BUG</span>
                <span class="bg-yellow-100 text-yellow-500 font-bold w-32 text-center rounded-xl p-1 text-xs flex gap-1 items-center"><i class="fa-regular fa-life-ring"></i>HELP WANTED</span>
            </div>

            <span class="text-gray-500">${issue.author}</span>
            <span class="text-gray-500">${issue.createdAt}</span>

            
        </div>`;

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

function searchIssue() {

    let text = document.getElementById("searchText").value

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)


        .then((res) => res.json())
        .then((data) => {
            issues = data.data
            renderIssues("all");
        });

}