const form =document.getElementById("expense-form");
const titleInput=document.getElementById("title");
const amountInput=document.getElementById("amount");
const expenseList=document.getElementById("expense-list");
const totalDisplay=document.getElementById("total");
const saveBtn = document.getElementById("save-expenses-btn");
const saveFeedback = document.getElementById("save-feedback");

let expenses=JSON.parse(localStorage.getItem("expenses"))||[];

function updateTotal(){
    const total=expenses.reduce((sum,expense)=>sum+ expense.amount,0);
    totalDisplay.textContent=total.toFixed(2);
}

function saveExpenses(){
    localStorage.setItem("expenses",JSON.stringify(expenses));
}

function renderExpense(expense){
    const li=document.createElement("li");
    li.innerHTML=`
    <span>${expense.title}</span>
    <span>Rs.${expense.amount}</span>`;
    expenseList.appendChild(li);
}
expenses.forEach(renderExpense);

updateTotal();
form.addEventListener("submit",function(e){
    e.preventDefault();

const title = titleInput.value.trim();
const amount = parseFloat(amountInput.value);

if (title === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter valid title and amount");
    return;
}

const newExpense = { title, amount };
expenses.push(newExpense);

renderExpense(newExpense);
updateTotal();
saveExpenses();

titleInput.value = "";
  amountInput.value = "";
  
});

if (saveBtn) {
  saveBtn.addEventListener("click", function() {
    saveExpenses();
    if (saveFeedback) {
      saveFeedback.textContent = "Expenses saved!";
      saveFeedback.style.display = "block";
      setTimeout(() => {
        saveFeedback.style.display = "none";
      }, 2000);
    }
  });
}