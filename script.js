const display = document.getElementById("display");

const buttons = document.querySelectorAll(".buttons button");

const themeBtn = document.getElementById("themeBtn");

const copyBtn = document.getElementById("copyBtn");

const historyBtn = document.getElementById("historyBtn");

const historyPanel = document.getElementById("historyPanel");

const closeHistory = document.getElementById("closeHistory");

const historyList = document.getElementById("historyList");

let expression = "";

let history = [];

// =======================
// Calculator Buttons
// =======================

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        const value = button.textContent;

        if(value==="AC"){

            expression="";

            display.value="";

        }

        else if(value==="DEL"){

            expression=expression.slice(0,-1);

            display.value=expression;

        }

        else if(value==="="){

            calculate();

        }

        else{

            expression+=value;

            display.value=expression;

        }

    });

});

// =======================
// Calculate
// =======================

function calculate(){

    try{

        let result=eval(expression);

        history.unshift(expression+" = "+result);

        if(history.length>5){

            history.pop();

        }

        updateHistory();

        display.value=result;

        expression=result.toString();

    }

    catch{

        display.value="Error";

        expression="";

    }

}

// =======================
// Update History
// =======================

function updateHistory(){

    historyList.innerHTML="";

    history.forEach(item=>{

        const li=document.createElement("li");

        li.textContent=item;

        historyList.appendChild(li);

    });

}

// =======================
// Theme Toggle
// =======================

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    const icon=themeBtn.querySelector("i");

    if(document.body.classList.contains("dark")){

        icon.className="fa-solid fa-sun";

    }

    else{

        icon.className="fa-solid fa-moon";

    }

});

// =======================
// Copy Result
// =======================

copyBtn.addEventListener("click",()=>{

    navigator.clipboard.writeText(display.value);

    copyBtn.innerHTML='<i class="fa-solid fa-check"></i> Copied';

    setTimeout(()=>{

        copyBtn.innerHTML='<i class="fa-solid fa-copy"></i> Copy';

    },1500);

});

// =======================
// History Panel
// =======================

historyBtn.addEventListener("click",()=>{

    historyPanel.classList.add("active");

});

closeHistory.addEventListener("click",()=>{

    historyPanel.classList.remove("active");

});

// =======================
// Keyboard Support
// =======================

document.addEventListener("keydown",(e)=>{

    const key=e.key;

    if(!isNaN(key)||"+-*/.%".includes(key)){

        expression+=key;

        display.value=expression;

    }

    else if(key==="Enter"){

        e.preventDefault();

        calculate();

    }

    else if(key==="Backspace"){

        expression=expression.slice(0,-1);

        display.value=expression;

    }

    else if(key==="Escape"){

        expression="";

        display.value="";

    }

});