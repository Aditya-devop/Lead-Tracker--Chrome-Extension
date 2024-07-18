let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {// this is made for keeping the links entack even after referesh
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"

        listItems += `
            <li> 
            <a target='_blank' href='${leads[i]}'> ${leads[i]}</a>
            </li>
            `
        // let li=document.createElement("li")
        // li.textContent=myLeads[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listItems;
    inputEl.value = ""
}
deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))// We stringfy because we can store only in strings in local storage
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

    
// localStorage.setItem("myleads","https://www.linkedin.com")
// console.log(localStorage.getItem("myleads"))
// localStorage.clear()