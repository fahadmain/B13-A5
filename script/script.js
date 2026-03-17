const tabs = document.querySelectorAll(".tab");
const container = document.getElementById("issue-container");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

let issues = [];

// fetching data 
spinner.classList.remove("hidden");

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
        issues = data.data
        // console.log(issues);
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

    document.getElementById("count").innerText = `${filtered.length} Issues`;

    filtered.forEach((issue) => {
        let card = document.createElement("div");

        const status = issue.status?.toLowerCase().trim();

        let statusImg = status === "open"
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

        let border = status === "open" ? "border-t-green-500" : "border-t-purple-500";
        card.className = `border-t-4 card bg-gray-100 w-80 h-96 shadow-xl rounded-xl ${border} cursor-pointer`;
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

        card.onclick = function(){
            openModal(issue.id);
        }

        container.appendChild(card);
    })


}


// modal 
function openModal(id){
   fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) => {
        let issue = data.data
        let priorityStyle = "";

        if (issue.priority === "high") {
            priorityStyle = "bg-red-500 text-white";
        } else if (issue.priority === "medium") {
            priorityStyle = "bg-yellow-600 text-white";
        } else {
            priorityStyle = "bg-gray-500 text-white";
        }

        modalContent.innerHTML = `
             <div class="w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
  
  <h2 class="text-3xl font-bold text-sky-950 mb-4">${issue.title}</h2>
  
  <div class="flex items-center gap-2 mb-6 text-sm text-slate-500">
    <span class="bg-green-400 text-white px-3 py-1 rounded-full font-medium">Closed</span>
    <span>•</span>
    <span>Opened by <span class="font-semibold">${issue.author}</span></span>
    <span>•</span>
    <span>06/01/2024</span>
  </div>

  <div class="flex gap-2 my-4">
                <span class="bg-red-100 text-red-500 font-bold w-16 text-center rounded-xl p-1 text-xs flex gap-1 items-center"><i class="fa-solid fa-bug"></i>BUG</span>
                <span class="bg-yellow-100 text-yellow-500 font-bold w-32 text-center rounded-xl p-1 text-xs flex gap-1 items-center"><i class="fa-regular fa-life-ring"></i>HELP WANTED</span>
            </div>

  <p class="text-slate-500 text-lg mb-10">
    ${issue.description}
  </p>

  <div class="rounded-2xl p-6 flex justify-between items-center">
    <div class="flex flex-col gap-1">
      <p class="text-slate-400 text-sm font-medium">Assignee:</p>
      <p class="text-sky-950 font-bold text-xl">${issue.assignee}</p>
    </div>
    <div class="text-right">
      <p class="text-slate-400 text-sm font-medium mb-2">Priority:</p>
      <span class="${priorityStyle} text-white px-5 py-1.5 rounded-full text-xs font-black tracking-widest">${issue.priority}</span>
    </div>
  </div>
</div>
        `
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }); 
}

// close modal 
document.getElementById("closeModal").onclick = function(){
    modal.classList.add("hidden");
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