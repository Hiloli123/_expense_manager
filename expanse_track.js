
// If data exist in localstorage then retrive it and not then make a empty array
const expanse_manager = JSON.parse(localStorage.getItem("Expance Detail")) || [];


function addExpanse() {

    try{

        `This function is for using add expanse.
        It is take an inputs like expense name,
        category,amount and date and add it to localstorage
        array name expanse manager`

        let name_expanse = document.getElementById("expansename").value;

        
        let category = document.getElementById("expansecategory").value;

        let amount = Number(document.getElementById("expanseamount").value);

        let date_of_expense = document.getElementById("expensedate").value;

        let inputs = document.querySelectorAll('input');

        //make a inputs validation to unwanted data

        if (name_expanse == "" || (!/[a-zA-Z0-9]/.test(name_expanse))){

            alert("Expense Name is Not Valid!")

            return;
    
        }

        if (amount == ""){
            alert("Amount is empty")
            return;
        }

        if ( amount <= 0 ){
            alert("Amount is not valid!")
            return;
        }

        const today = new Date();

        // Get individual components
        const year = today.getFullYear();

        // Month is 0-indexed, so add 1
        const month = (today.getMonth() + 1).toString().padStart(2, '0');

        const day = today.getDate().toString().padStart(2, '0');

        // Concatenate into 'yyyy-mm-dd' format
        const formattedDate = `${year}-${month}-${day}`;


        if (!date_of_expense || (date_of_expense > formattedDate) ){
            alert("Date Is Not valid!!")
            return;
        }

        //store all detail in dictionary
        let add_expanse = {}

        add_expanse["name"] = name_expanse;

        add_expanse["category"] = category;

        add_expanse["amount"] = amount;

        //for generate unique id
        add_expanse["id"] = Date.now();


        add_expanse["date"] = date_of_expense;

        
        //add it to expanse manager
        expanse_manager.push(add_expanse)

        //add to local storage
        localStorage.setItem("Expance Detail", JSON.stringify(expanse_manager))

        //show on body
        getexpanse();

        //make a inputs value clear
        inputs.forEach(input  =>  input.value = '');

    } catch(e){

        alert("Something Wrong!")
    }

    
}

function getexpanse() {
    try {

        `This function is use for show the 
        expanses form expanse manager on body`

        //it store the data which access
        const show = []

        //to access data
        for (let i = 0; i < expanse_manager.length; i++) {

            show.push({
                "id": expanse_manager[i].id, "name": expanse_manager[i].name, "category": expanse_manager[i].category,

                "amount": expanse_manager[i].amount, "date": expanse_manager[i].date
            })
        }

        //make add task button visible
        document.getElementById("addtask").style.visibility = "visible";

        //to show data call a function
        showexpense(show)
    } catch (e){
        alert("Something Wrong!!")
    }

}

function showexpense(show){

    try{

        `This function is use for show a data
        Args:
        show:It is Array of All expenses data
        beacause when we filter it shows a filter diffrent data.
        `
        
        //make a clear to before filter
        document.getElementById("expanseshow").innerHTML = " ";

        

        

        
        //make a table to show a data
        document.getElementById("expanseshow").innerHTML += `<table id="mytable">
                                                                <thead>
                                                                    <tr>
                                                                        <th>ID</th>
                                                                        <th>Name Of Expense</th>
                                                                        <th>Category</th>
                                                                        <th>Amount</th>
                                                                        <th>Date</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="tablebody"></tbody>
                                                            </table>
                                                            `

        //make a table body                                                
        let tbody = document.getElementById("tablebody");

        //to total the amount according to table
        const expenses = [];

        if (show.length == 0){
                
                tbody.innerHTML += `<tr id="nodata"><td colspan="6" style="text-align:center;">No Data Found</td></tr>`;

                document.getElementById("totalshow").innerHTML = "";

        }

        else {

        
            //make a table
            for (let i = 0; i < show.length; i++) {

                //add the amount
                expenses.push(show[i].amount)

                

            
                    //add the table data dynamically
                    tbody.innerHTML += `
                                        <tr>
                                            <td contenteditable="false">${show[i].id}</td>
                                            <td >${show[i].name}</td>
                                            <td >${show[i].category.charAt(0).toUpperCase()}${show[i].category.slice(1)}</td>
                                            <td >${show[i].amount}</td>
                                            <td >${show[i].date}</td>
                                            <td><div id="editdelete"><button id=edit onclick="editexpense(${show[i].id})" contenteditable="false">Edit </button> 
                                            <button id=delete contenteditable="false" onclick="deleteexpense(${show[i].id})">Delete</button></div></td>
                                        </tr>
                                    
                                    `
                    
        }
        //calculate the total expenses
        let total_expenses = 0;

        function sum_expense(value,index,array){

            `this function is for calculate total amount according to filter`

            total_expenses+=Number(value)

        }

        //total sum
        expenses.forEach(sum_expense)

        //show a total expenses
        document.getElementById("totalshow").innerHTML = "Total Expenses: " + total_expenses;
        }
    } 
    catch(e){
            alert("Something Wrong!!")

    }
}




function filterUI(filter_value){

    try{

        `This Method control filter UI.
        
        Args:
        filter_value:It takes a value which we need to filter like all,category,etc.

        It show the inputs according to we select the filter.
        It take a value from inputs and call the validation function 
        when click the filter button`


        //first show it clear to erase before filter detail
        document.getElementById("showfilter").innerHTML = " ";

        
        //to selected all value in filter
        if (filter_value == "all"){

            
            //show a filter button
            document.getElementById("showfilter").innerHTML += `<button onclick="filterexpanse('${filter_value}')"> Filter</button>`

            
        }

        //if select a categoy option
        if (filter_value == "category"){

            document.getElementById("showfilter").innerHTML += `<select id="filter">
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="rent">Rent</option>
                        <option value="shopping">Shopping</option>
                        <option value="medical">Medical</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="investment">Investment</option>
                        <option value="other">Other</option>

                    </select>`

            document.getElementById("showfilter").innerHTML += `<button onclick="filterexpanse('${filter_value}')"> Filter</button>`;


        }

        //if select amount option
        if (filter_value == "amount"){

            
            document.getElementById("showfilter").innerHTML +=`<input type="number" id="filter" placeholder="Enter Amount">
                                                <button onclick="filterexpanse('${filter_value}')">Filter</button>`;

            
        }

        //if select date option
        if (filter_value == "date"){

            
            document.getElementById("showfilter").innerHTML += `<input type="date" id="filter">
                                                <button onclick="filterexpanse('${filter_value}')">Filter</button>`;
                                        
        }
    }   
    catch(e){
        alert("Something Wrong!!")
    }


    }




function filterexpanse(f_value) {

        

        `It take a value parameter filter in string format.
        like all,category,

        Args:
        f_value:all,category,amount,date
        
        and validate data.
        It take a also filter_value as a user input and do the
        further process.`

        let filter_name = f_value;

        
        
        //take a user input
        if (filter_name == "all"){

                getexpanse();
            }

        let filter_value = document.getElementById("filter").value;

        
        //validation
        if (filter_value == ""){
            alert("Empty Value not allowed");
            return;
        }

        try{    

            const today = new Date();

            // Get individual components
            const year = today.getFullYear();

            // Month is 0-indexed, so add 1
            const month = (today.getMonth() + 1).toString().padStart(2, '0');

            const day = today.getDate().toString().padStart(2, '0');

            // Concatenate into 'yyyy-mm-dd' format
            const formattedDate = `${year}-${month}-${day}`;


            if (filter_name == "date" && (filter_value > formattedDate) ){
                alert("Date Is Not valid!!")
                return;
            }

            if (filter_name == "amount" && (filter_value <= 0) ){
                alert("Amount Is Not valid!!")
                return;
            }
            //make it lower to compare
            let fil_value = filter_value.toLowerCase();

            //to show a filter data
            const filter = []

            
            //access the expanse manager to filter data
            for (let i = 0; i < expanse_manager.length; i++) {

                //filter category wise
                if (filter_name == "category" && expanse_manager[i].category == fil_value) {

                    filter.push({
                        "category": expanse_manager[i].category, "amount": expanse_manager[i].amount
                        , "date": expanse_manager[i].date, "id": expanse_manager[i].id, "name": expanse_manager[i].name
                    })
                }
                //filter amount wise
                else if (filter_name == "amount" && expanse_manager[i].amount == filter_value) {

                    filter.push({
                        "category": expanse_manager[i].category, "amount": expanse_manager[i].amount
                        , "date": expanse_manager[i].date, "id": expanse_manager[i].id, "name": expanse_manager[i].name
                    })
                }

                //filter date wise
                else if (filter_name == "date" && expanse_manager[i].date == String(filter_value)) {

                    filter.push({
                        "category": expanse_manager[i].category, "amount": expanse_manager[i].amount
                        , "date": expanse_manager[i].date, "id": expanse_manager[i].id, "name": expanse_manager[i].name
                    })
                }


            }
            //after filter it pass a filter array to show data in table

            showexpense(filter)

            if (filter_name == "all"){

                    getexpanse();
                }
        } catch(e){
            alert("Something Wrong!")
        }

     
}



function editexpense(id) {

    try{

        `This method is use for edit the expense.
        Args:
        ID: Unique ID of expense.
        It make row foucs which need to be edited.
        Tt make row editable`


        let table = document.getElementById("mytable");

        for (let i=1; i < table.rows.length;i++){

            let row = table.rows[i];

            let rowid = row.cells[0].innerHTML;


            if(Number(id) == Number(rowid)){

                //set tow editable
                row.setAttribute("contenteditable","true")

                //make it focus
                row.focus()

                //make filter hidden when edit the expense
                document.getElementById("filterexpanse").style.visibility = "hidden";
                document.getElementById("showfilter").style.visibility = "hidden";

                //call the update expensse
                updateexpense(row)

            }

        } 
    }catch(e){
        alert("Something Wrong!!")
    }   

}

function updateexpense(row){

    try{

        `This function is used for Update the expenses detail.

        Args:
        row: It take HTML table row as an argument which selected by user for edited.`

        //extract id from selected row
        let id_row = row.cells[0].innerHTML;

        //access the table
        let new_table1 = document.getElementById("mytable");

        //to access it value
        for (let i=1; i < new_table1.rows.length;i++){

            let row_hide = new_table1.rows[i];

            //make last edit and cancel button hide when edit
            row_hide.cells[5].innerHTML = " ";


        }
        //make a input for edit name
        row.cells[1].innerHTML = `<input type="text" id="updatename" value='${row.cells[1].innerHTML}'>`

        const cat = ["food","travel","rent","shopping","medical","entertainment","investment","other"];

        let options = "";

        
        for (let cate of cat){

            if (cate !=  row.cells[2].innerHTML )

        //for edit category
            options += `<option value='${cate}'>${cate.charAt(0).toUpperCase()}${cate.slice(1)}</option>`;
        }

        row.cells[2].innerHTML = `<select id="updatecategory">
                                <option value='${row.cells[2].innerHTML}'>${row.cells[2].innerHTML.charAt(0).toUpperCase()}${row.cells[2].innerHTML.slice(1)}</option>
                                ${options}</select>`


        
        //for edit amount
        row.cells[3].innerHTML = `<input type="number" id="updateamount" value='${row.cells[3].innerHTML}'>`

        //for edit date
        row.cells[4].innerHTML = `<input type="date" id="updatedate" value='${row.cells[4].innerHTML}'>`


        //make a add task button hide when edit the task
        document.getElementById("addtask").style.visibility = "hidden";

        // visible save and cancel button instead of edit and delete button
        row.cells[5].innerHTML = `<div id="savecancel"><button id="saveedit" onclick='saveedit("${id_row}")' contenteditable="false">Save</button>
                                <button id="canceledit" onclick='canceledit()' contenteditable="false">Cancel</button></div>`;

        

    }catch(e){
        alert("Something Wrong!")

    }
}
    
function saveedit(id_of_row){

    try{

        `This Method Takes again data from table which edited
        ,validate it and save it.

        Args:
        id_of_row: id which is edited by user`

        //access the table 
        let new_table2 = document.getElementById("mytable");

        //to access table
        for (let i=1; i < new_table2.rows.length;i++){
            
            //make a new row
            let new_row = new_table2.rows[i];

            //extract id from row
            let row_id = new_row.cells[0].innerHTML;

            
            //compare the id 
            if(row_id == id_of_row){

                //extract each data updated or not
                let name = document.getElementById("updatename").value;

                
                let category = document.getElementById("updatecategory").value;

                
                let amount = document.getElementById("updateamount").value;


                let date = document.getElementById("updatedate").value;

                //make a validation
                if (name == ""|| (!/[a-zA-Z0-9]/.test(name))){
                    alert("Expense Name is Not Valid!");
                    return;
                }

                if (category == ""){
                    alert("category is Empty!");
                    return;
                }


                if (amount == "" || amount <= 0){
                    alert("Amount is Not Valid!");
                    return;
                }


                if (date == ""){
                    alert("Date is Empty!");
                    return;
                }

                const today = new Date();

                // Get individual components
                const year = today.getFullYear();

                // Month is 0-indexed, so add 1
                const month = (today.getMonth() + 1).toString().padStart(2, '0');

                const day = today.getDate().toString().padStart(2, '0');

                // Concatenate into 'yyyy-mm-dd' format
                const formattedDate = `${year}-${month}-${day}`;


                if ( date > formattedDate ){
                    alert("Date Is Not valid!!");

                    return;
                }



                    //replace with the new value
                    for ( let j = 0; j < expanse_manager.length; j++) {

                        
                            if(expanse_manager[j].id == row_id) {

                            expanse_manager[j]["name"] = name;
                            expanse_manager[j]["category"] = category;
                            expanse_manager[j]["amount"] = amount;
                            expanse_manager[j]["date"] = date;

                            //store it in localstorage again
                            localStorage.setItem("Expance Detail", JSON.stringify(expanse_manager))
                            
                            //make filters again visible
                            document.getElementById("filterexpanse").style.visibility = "visible";
                            document.getElementById("showfilter").style.visibility = "visible";

                            //make unfocus row 
                            new_row.blur();

                            //make again uneditable row
                            new_row.setAttribute("contenteditable","false")
                            
                            //show expenses with new value
                            getexpanse()

                        }

                    }
                }


            }

        }catch(e){
            alert("Something Wrong!!")

        }
}





function deleteexpense(id_of_row){

    try{

        `This function is for delete expases.
        
        Args: 
        id_of_row: It deletable expense row.`

        //access the expense
        for ( let j = 0; j < expanse_manager.length; j++) {

            if (expanse_manager[j].id == id_of_row) {

                //for confirmation
                getConfirmation(j)

                

            }

        }

    } catch(e){
        alert("Something Wrong!!")
    }
}

function getConfirmation(j) {

        try{

        `This  function is for confirm and delete`

            //ask
            var Val = confirm("Confirm Delete the Expense ?");
            
            //if okay
            if( Val == true ) {

                //delete expense
                expanse_manager.splice(j, 1);

                //again save in localstorage
                localStorage.setItem("Expance Detail", JSON.stringify(expanse_manager))

                //show expense
                getexpanse();
            
            //if cancel   
            } else {
                //show expense
                getexpanse();

            
        }
    } catch(e){
        alert("Something Wrong!")
    }
}

function canceledit(){

        try{

        `This function is for cancel edit.`
        
        document.getElementById("filterexpanse").style.visibility = "visible";
        
        document.getElementById("showfilter").style.visibility = "visible";

        getexpanse();
    } catch(e){
        alert("Something Wrong!!")
    }
}