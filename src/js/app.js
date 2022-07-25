import "../css/styles.scss";

function addButtons(){
    for(let i = 0; i < 200; i++){
        const newButton = document.createElement("button");
        newButton.style.borderRadius = '50%';
        newButton.style.width = "100%";
        newButton.style.height = "100%";
        newButton.style.opacity = "0.5";
        let pressed = 0;
        newButton.addEventListener("click", function() {
            if(pressed === 0)
                pressed = 1;
            else
                pressed = 0;
            
            if(pressed === 1)
                newButton.style.backgroundColor = 'red';
            else
                newButton.style.backgroundColor = 'none';

        });
        document.querySelector(".buttonGrid").appendChild(newButton);
    }
}



console.log(addButtons());