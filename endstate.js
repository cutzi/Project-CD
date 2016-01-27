var endstateIsActive = false;

function switchToEndstate(){
	endstateIsActive = true;
	showGameoverText();
}

function showGameoverText(){
	clearTextMessage();
	if(hpCounter <= 0){
		appendTextMessage("Du bist tot :( <br> Du hast leider all deine Lebenspunkte verloren.<br> Aber Hey! Mit [R] kannst du es nochmal versuchen!");
	}
	else{
		appendTextMessage("Du hast zu lange gebraucht und es ist dunkel geworden. <br> Du findest nicht mehr nach Hause und verhungerst im Wald. :( <br> Aber Hey! Mit [R] kannst du es nochmal versuchen!");
	}
}

function isInEndstate(){
	return endstateIsActive;
}