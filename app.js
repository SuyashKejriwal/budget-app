class Budget{
    constructor(){
        this.budgetfeedback=document.querySelector(".budget-feedback");
        this.expensefeedback=document.querySelector(".expense-feedback");
        this.budgetform=document.getElementById("budget-form");
        this.budgetinput=document.getElementById("budget-input");
        this.budgetamount=document.getElementById("budget-amount");
        this.expenseamount=document.getElementById("expense-amount");
        this.balance=document.getElementById("balance");
        this.balanceamount=document.getElementById("balance-amount");
        this.expenseform=document.getElementById("expense-form");
        this.expenseinput=document.getElementById("expense-input");
        this.amountinput=document.getElementById("amount-input");
        this.expenselist=document.getElementById("expense-list");
        this.itemlist=[];
        this.itemid=0;
    }

    // edit expense
    editExpense(element){
        console.log('inside the edit expense method.');
        
        let id=parseInt(element.dataset.id);
          let parent=element.parentElement.parentElement.parentElement;
          //remove from dom
          console.log(parent);
          
          this.expenselist.removeChild(parent);
       
          // remove from the dom
          let expense=this.itemlist.filter(function (item) {
              return item.id===id;
          })
          // show value
          this.expenseinput.value=expense[0].title;
          this.amountinput.value=expense[0].amount;
          //remove from list
          let tempList=this.itemlist.filter(function (item) {
              return item.id!==id;
          })
          this.itemlist=tempList;
          this.showbalance;
           }
       
           // delete expense 
           deleteExpense(element){
               console.log('delete button clicked');
               
            let id=parseInt(element.dataset.id);
            let parent=element.parentElement.parentElement.parentElement.parentElement.parentElement;
            //remove from dom
            console.log(parent);
            
            this.expenselist.removeChild(parent);
         
            // remove from the dom
            let expense=this.itemlist.filter(function (item) {
                return item.id===id;
            })
            // show value
            this.expenseinput.value=expense[0].title;
            this.amountinput.value=expense[0].amount;
            this.showbalance;
           }
    // submit budget method
    submitbudgetform(){
        console.log("hello from submit.");
         const value=this.budgetinput.value;
         if(value==''||value<0){
             this.budgetfeedback.classList.add('showItem');
             console.log(this);
             this.budgetfeedback.innerHTML='<p> Value cannot be empty or negative</p>';
              const self=this;
             setTimeout( function() {
                 console.log(this); // it is not pointing to class but to global obj
                 console.log(self);
                 self.budgetfeedback.classList.remove('showItem');
             }, 4000);
         }
         else{
             this.budgetamount.textContent=value;
             this.budgetinput.value='';
             this.showbalance();
         }
    }
    
    // showbalance
    showbalance(){
        const expense=this.totalexpense();
        const total=parseInt(this.budgetamount.textContent)-expense;
        this.balanceamount.textContent=total;
        if(total>0){
            this.balance.classList.remove('showRed','showBlack');
            this.balance.classList.add('showGreen');
        }
        else if(total<0){
            this.balance.classList.remove('showGreen','showBlack');
            this.balance.classList.add('showRed');
        }
        else{
            this.balance.classList.remove('showGreen','showRed');
            this.balance.classList.add('showBlack');
        }
    }

    submitexpenseform(){
        const expensetype=this.expenseinput.value;
        const amountinput=this.amountinput.value;
        if(amountinput<0||amountinput==''){
            this.expensefeedback.classList.add('showItem');
            const self=this;
            this.expensefeedback.innerHTML='<p> The expense value cannot be negative or zero.</p>';
            setTimeout(function() {
                self.expensefeedback.classList.remove('showItem');
            }, 4000);
        }
       else if(expensetype==''){
            this.expensefeedback.classList.add('showItem');
            const self=this;
            this.expensefeedback.innerHTML='<p> The expense type cannot be empty.</p>';
            setTimeout(function() {
                self.expensefeedback.classList.remove('showItem');
            }, 4000);
        }
        else{
             let amount=parseInt(amountinput);
             this.expenseinput.value="";
             this.amountinput.value="";

             let expense={
                 id:this.itemid,
                 title:expensetype,
                 amount:amount
             }
             this.itemid++;
             this.itemlist.push(expense);
             this.addExpense(expense);
             this.showbalance();
        }
    }
    /// total expense
    totalexpense(){
        let total=0;
        if(this.itemlist.length>0){
total=this.itemlist.reduce(function (acc,curr) {
    acc+=curr.amount;
   return acc;  
},0)
        }
        this.expenseamount.textContent=total;
        return total;
    }
     // addexpense
    addExpense(expense){
        const div=document.createElement('div');
        div.classList.add('expense');
        div.innerHTML= `
        <div class="expense-item d-flex justify-content-sm-between justify-content-lg-around align-items-baseline">
                                    <h6 class="expense-title text-center mb-0 text-uppercase list-item">
                                    ${expense.title}

                                    </h6>
                                    <h5 class="expense-amount text-center mb-0 list-item">
                                    ${expense.amount}
                                    </h5>
                                    <div class="expense-icons list-item">
                                    <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                     <a href="#" class="delete-icon" data-id="${expense.id}">
                                      <i class="fas fa-trash"></i>
                                    </a>
                                </div>
                                </div>
                         `;
                         this.expenselist.appendChild(div);
    }

    
}

function eventListeners() {
    const budgetform=document.getElementById("budget-form");
    const expenseform=document.getElementById("expense-form");
    const expenselist=document.getElementById("expense-list");

    // new instance of Budget class
    const budg=new Budget();

    // budget-form submit
    budgetform.addEventListener("submit",function (event) {
        event.preventDefault();        
        budg.submitbudgetform();
    })

    // expense-form submit
    expenseform.addEventListener("submit",function (event) {
        event.preventDefault();
        budg.submitexpenseform();
    })

    // expense list  click
    expenselist.addEventListener("click",function (event) {
        
        console.log('edit button clicked');
        console.log(event.target.parentElement);
        if(event.target.parentElement.classList.contains('edit-icon')){
        budg.editExpense(event.target.parentElement);
        }
        else if(event.target.parentElement.parentElement.classList.contains('delete-icon')){
            console.log('delete');
            budg.deleteExpense(event.target.parentElement);
        }
    })
}
document.addEventListener("DOMContentLoaded",function (){
    eventListeners();
} )
